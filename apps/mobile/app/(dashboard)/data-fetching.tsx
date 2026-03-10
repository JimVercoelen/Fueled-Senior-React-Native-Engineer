import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Pressable,
  Platform,
  Modal as RNModal,
  ScrollView as RNScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Typography from '@/components/ui/Typography';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import ErrorBoundary from '@/components/feedback/ErrorBoundary';
import { SkeletonCard } from '@/components/feedback/Skeleton';
import Modal from '@/components/feedback/Modal';
import ModalContent from '@/components/feedback/ModalContent';

import { useToast } from '@/contexts/toast';
import { useModal } from '@/contexts/modal';
import { useItems, useCreateItem, useUpdateItem, useDeleteItem } from '@/hooks/use-items';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { CATEGORIES, PRIORITIES, STATUSES } from '@/types/database';
import type { Item, CreateItemInput } from '@/types/database';

// -- Validation schema for create/edit form --
const taskSchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Min 3 characters')
    .max(100, 'Max 100 characters'),
  description: yup.string().max(500, 'Max 500 characters').nullable().default(null),
  category: yup
    .string()
    .required('Category is required')
    .oneOf([...CATEGORIES]),
  priority: yup
    .string()
    .required('Priority is required')
    .oneOf([...PRIORITIES]),
  status: yup
    .string()
    .required('Status is required')
    .oneOf([...STATUSES]),
});

type TaskFormValues = yup.InferType<typeof taskSchema>;

// -- Badge type mapping --
const categoryBadgeType: Record<string, string> = {
  frontend: 'neutral',
  backend: 'neutral',
  design: 'neutral',
  devops: 'neutral',
};

const priorityBadgeType: Record<string, string> = {
  high: 'error',
  medium: 'warning',
  low: 'info',
};

const statusBadgeType: Record<string, string> = {
  active: 'cyan',
  completed: 'success',
  archived: 'neutral',
};

// -- Web-only styles (cast needed for RN type compat) --
const webPressableStyles = Platform.OS === 'web' ? ({ userSelect: 'none' } as any) : {};
const webInputStyles = Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : undefined;

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const allOptions = [
    { value: '', label: `All ${label}` },
    ...options.map((o) => ({ value: o, label: capitalize(o) })),
  ];
  const selected = allOptions.find((o) => o.value === value);

  return (
    <View className="flex-1 min-w-[120px]">
      <Pressable
        onPress={() => setOpen(true)}
        className="bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 flex-row items-center justify-between"
        style={webPressableStyles}
      >
        <Typography variant="caption" className={value ? 'text-white' : 'text-neutral-400'}>
          {selected?.label ?? `All ${label}`}
        </Typography>
        {value ? (
          <Pressable
            onPress={(e) => {
              e.stopPropagation();
              onChange('');
            }}
            hitSlop={8}
          >
            <MaterialIcons name="close" size={16} color="rgba(255,255,255,0.5)" />
          </Pressable>
        ) : (
          <MaterialIcons name="expand-more" size={18} color="rgba(255,255,255,0.5)" />
        )}
      </Pressable>
      <RNModal
        transparent
        visible={open}
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          className="flex-1 items-center justify-center bg-black/60 px-4"
          onPress={() => setOpen(false)}
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View className="bg-[#0a0a0a] border border-white/15 rounded-xl overflow-hidden w-64">
              <RNScrollView style={{ maxHeight: 300 }}>
                {allOptions.map((option, index) => (
                  <React.Fragment key={option.value}>
                    {index > 0 && <View className="h-px bg-white/10" />}
                    <Pressable
                      onPress={() => {
                        onChange(option.value);
                        setOpen(false);
                      }}
                      className="flex-row items-center justify-between px-4 py-3"
                      style={webPressableStyles}
                    >
                      <Typography variant="body" className="text-neutral-300">
                        {option.label}
                      </Typography>
                      {option.value === value && (
                        <MaterialIcons name="check" size={18} color="#6E5BFF" />
                      )}
                    </Pressable>
                  </React.Fragment>
                ))}
              </RNScrollView>
            </View>
          </Pressable>
        </Pressable>
      </RNModal>
    </View>
  );
}

// -- Form Select for create/edit modal (uses react-hook-form Controller) --
function FormSelect({
  control,
  name,
  label,
  options,
}: {
  control: any;
  name: string;
  label: string;
  options: readonly string[];
}) {
  const [open, setOpen] = useState(false);
  const selectOptions = options.map((o) => ({ value: o, label: capitalize(o) }));

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const selected = selectOptions.find((o) => o.value === value);
        return (
          <View className="mb-3">
            <Typography variant="body" className="text-white mb-1.5">
              {label}
            </Typography>
            <Pressable
              onPress={() => setOpen(true)}
              className="bg-white/5 border rounded-xl px-4 py-3 flex-row items-center justify-between"
              style={[
                { borderColor: error ? '#ef4444' : 'rgba(255,255,255,0.15)' },
                webPressableStyles,
              ]}
            >
              <Typography variant="body" className={selected ? 'text-white' : 'text-neutral-400'}>
                {selected ? selected.label : `Select ${label.toLowerCase()}`}
              </Typography>
              <MaterialIcons name="expand-more" size={20} color="rgba(255,255,255,0.5)" />
            </Pressable>
            {error?.message && (
              <Typography variant="caption" className="text-red-400 mt-1">
                {error.message}
              </Typography>
            )}
            <RNModal
              transparent
              visible={open}
              animationType="fade"
              onRequestClose={() => setOpen(false)}
            >
              <Pressable
                className="flex-1 items-center justify-center bg-black/60 px-4"
                onPress={() => setOpen(false)}
              >
                <Pressable onPress={(e) => e.stopPropagation()}>
                  <View className="bg-[#0a0a0a] border border-white/15 rounded-xl overflow-hidden w-64">
                    <RNScrollView style={{ maxHeight: 300 }}>
                      {selectOptions.map((option, index) => (
                        <React.Fragment key={option.value}>
                          {index > 0 && <View className="h-px bg-white/10" />}
                          <Pressable
                            onPress={() => {
                              onChange(option.value);
                              setOpen(false);
                            }}
                            className="flex-row items-center justify-between px-4 py-3"
                            style={webPressableStyles}
                          >
                            <Typography variant="body" className="text-neutral-300">
                              {option.label}
                            </Typography>
                            {option.value === value && (
                              <MaterialIcons name="check" size={18} color="#6E5BFF" />
                            )}
                          </Pressable>
                        </React.Fragment>
                      ))}
                    </RNScrollView>
                  </View>
                </Pressable>
              </Pressable>
            </RNModal>
          </View>
        );
      }}
    />
  );
}

// -- Helper --
function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// -- Task Form Modal --
function TaskFormModal({
  visible,
  onClose,
  editItem,
}: {
  visible: boolean;
  onClose: () => void;
  editItem: Item | null;
}) {
  const { showToast } = useToast();
  const createMutation = useCreateItem();
  const updateMutation = useUpdateItem();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: yupResolver(taskSchema),
    defaultValues: {
      title: '',
      description: null,
      category: 'frontend',
      priority: 'medium',
      status: 'active',
    },
  });

  useEffect(() => {
    if (!visible) return;
    if (editItem) {
      reset({
        title: editItem.title,
        description: editItem.description,
        category: editItem.category as (typeof CATEGORIES)[number],
        priority: editItem.priority as (typeof PRIORITIES)[number],
        status: editItem.status as (typeof STATUSES)[number],
      });
    } else {
      reset({
        title: '',
        description: null,
        category: '' as any,
        priority: '' as any,
        status: '' as any,
      });
    }
  }, [visible, editItem, reset]);

  const onSubmit = useCallback(
    (values: TaskFormValues) => {
      const input: CreateItemInput = {
        title: values.title,
        description: values.description ?? null,
        category: values.category,
        priority: values.priority,
        status: values.status,
      };

      if (editItem) {
        updateMutation.mutate(
          { id: editItem.id, ...input },
          {
            onSuccess: () => {
              showToast({ type: 'success', message: 'Task updated!' });
              onClose();
            },
            onError: () => {
              showToast({ type: 'error', message: 'Failed to update task. Please try again.' });
            },
          },
        );
      } else {
        createMutation.mutate(input, {
          onSuccess: () => {
            showToast({ type: 'success', message: 'Task created!' });
            onClose();
          },
          onError: () => {
            showToast({ type: 'error', message: 'Failed to create task. Please try again.' });
          },
        });
      }
    },
    [editItem, createMutation, updateMutation, showToast, onClose],
  );

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Modal visible={visible} onClose={onClose}>
      <ModalContent
        title={editItem ? 'Edit Task' : 'Create Task'}
        onClose={onClose}
        footer={
          <View className="flex-row justify-end gap-3">
            <Button variant="outlined" label="Cancel" onPress={onClose} size="sm" />
            <Button
              variant="contained"
              label={editItem ? 'Update' : 'Create'}
              onPress={handleSubmit(onSubmit)}
              loading={isSubmitting}
              size="sm"
            />
          </View>
        }
      >
        <View className="gap-3">
          {/* Title */}
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <View>
                <Typography variant="body" className="text-white mb-1.5">
                  Title
                </Typography>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Task title"
                  placeholderTextColor="rgb(156, 163, 175)"
                  className="bg-white/5 border rounded-xl px-4 py-3 text-white font-body text-base"
                  style={[
                    { borderColor: error ? '#ef4444' : 'rgba(255,255,255,0.15)' },
                    webInputStyles,
                  ]}
                />
                {error?.message && (
                  <Typography variant="caption" className="text-red-400 mt-1">
                    {error.message}
                  </Typography>
                )}
              </View>
            )}
          />

          {/* Description */}
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <View>
                <Typography variant="body" className="text-white mb-1.5">
                  Description
                </Typography>
                <TextInput
                  value={value ?? ''}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Optional description"
                  placeholderTextColor="rgb(156, 163, 175)"
                  multiline
                  numberOfLines={3}
                  className="bg-white/5 border rounded-xl px-4 py-3 text-white font-body text-base"
                  style={[
                    {
                      borderColor: error ? '#ef4444' : 'rgba(255,255,255,0.15)',
                      textAlignVertical: 'top' as const,
                    },
                    webInputStyles,
                  ]}
                />
                {error?.message && (
                  <Typography variant="caption" className="text-red-400 mt-1">
                    {error.message}
                  </Typography>
                )}
              </View>
            )}
          />

          {/* Category, Priority, Status selects */}
          <FormSelect control={control} name="category" label="Category" options={CATEGORIES} />
          <FormSelect control={control} name="priority" label="Priority" options={PRIORITIES} />
          <FormSelect control={control} name="status" label="Status" options={STATUSES} />
        </View>
      </ModalContent>
    </Modal>
  );
}

// -- Main Screen --
function DataFetchingContent() {
  const { showToast } = useToast();
  const { showModal } = useModal();

  // Query state
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const debouncedSearch = useDebouncedValue(search, 300);

  // Reset page on filter/search change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, categoryFilter, priorityFilter, statusFilter]);

  // Data hooks
  const { data, isPending, isError } = useItems({
    page,
    search: debouncedSearch,
    category: categoryFilter,
    priority: priorityFilter,
    status: statusFilter,
  });

  const deleteMutation = useDeleteItem();

  // Form modal state
  const [formVisible, setFormVisible] = useState(false);
  const [editItem, setEditItem] = useState<Item | null>(null);

  const handleOpenCreate = useCallback(() => {
    setEditItem(null);
    setFormVisible(true);
  }, []);

  const handleOpenEdit = useCallback((item: Item) => {
    setEditItem(item);
    setFormVisible(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setFormVisible(false);
    // Delay clearing editItem so modal close animation isn't jarring
    setTimeout(() => setEditItem(null), 200);
  }, []);

  const handleDelete = useCallback(
    (item: Item) => {
      showModal({
        type: 'confirmation',
        title: 'Delete Task',
        content: 'Are you sure you want to delete this task? This action cannot be undone.',
        onConfirm: () => {
          deleteMutation.mutate(item.id, {
            onSuccess: () => {
              showToast({ type: 'success', message: 'Task deleted!' });
            },
            onError: () => {
              showToast({ type: 'error', message: 'Failed to delete task. Please try again.' });
            },
          });
        },
      });
    },
    [showModal, deleteMutation, showToast],
  );

  // Show error toast on query error
  useEffect(() => {
    if (isError) {
      showToast({
        type: 'error',
        message: 'Oops! Something went wrong. Please try again.',
      });
    }
  }, [isError, showToast]);

  const totalPages = data?.totalPages ?? 1;

  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="px-4 pb-8 pt-4 max-w-3xl mx-auto w-full"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Header */}
      <View className="mb-6">
        <View className="flex-row items-center justify-between mb-2 flex-wrap gap-2">
          <Typography variant="h2">Data Fetching</Typography>
          <Button
            variant="contained"
            label="Add Task"
            icon="add"
            size="sm"
            onPress={handleOpenCreate}
          />
        </View>
        <Typography variant="caption" className="text-white/50">
          TanStack Query + Supabase CRUD with optimistic updates
        </Typography>
      </View>

      {/* Search bar */}
      <View className="flex-row items-center bg-white/5 border border-white/15 rounded-xl px-4 py-3 mb-3">
        <MaterialIcons name="search" size={20} color="rgba(255,255,255,0.5)" />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search tasks..."
          placeholderTextColor="rgb(156, 163, 175)"
          className="flex-1 ml-2 text-white font-body text-base"
          style={webInputStyles}
          testID="search-input"
        />
        {search.length > 0 && (
          <Pressable onPress={() => setSearch('')}>
            <MaterialIcons name="close" size={18} color="rgba(255,255,255,0.5)" />
          </Pressable>
        )}
      </View>

      {/* Filter row */}
      <View className="flex-row gap-2 mb-4 flex-wrap" testID="filter-row">
        <FilterSelect
          label="Categories"
          value={categoryFilter}
          options={CATEGORIES}
          onChange={setCategoryFilter}
        />
        <FilterSelect
          label="Priorities"
          value={priorityFilter}
          options={PRIORITIES}
          onChange={setPriorityFilter}
        />
        <FilterSelect
          label="Statuses"
          value={statusFilter}
          options={STATUSES}
          onChange={setStatusFilter}
        />
      </View>

      {/* Loading skeletons */}
      {isPending && (
        <View className="gap-3" testID="loading-skeletons">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonCard key={i} lines={3} />
          ))}
        </View>
      )}

      {/* Task list */}
      {!isPending && data && (
        <View className="gap-3">
          {data.items.length === 0 ? (
            <View className="items-center py-12" testID="empty-state">
              <MaterialIcons name="inbox" size={48} color="rgba(255,255,255,0.2)" />
              <Typography variant="body" className="text-white/40 mt-3">
                No tasks found
              </Typography>
            </View>
          ) : (
            data.items.map((item) => (
              <View
                key={item.id}
                className="bg-white/5 border border-white/15 rounded-2xl p-4"
                testID="task-item"
              >
                <View className="flex-row items-start justify-between mb-2">
                  <View className="flex-1 mr-2">
                    <Typography variant="body" className="text-white font-body-semibold">
                      {item.title}
                    </Typography>
                    {item.description && (
                      <Typography
                        variant="caption"
                        className="text-white/50 mt-1"
                        numberOfLines={2}
                      >
                        {item.description}
                      </Typography>
                    )}
                  </View>
                  <View className="flex-row gap-1">
                    <Button
                      variant="text"
                      icon="edit"
                      size="sm"
                      onPress={() => handleOpenEdit(item)}
                    />
                    <Button
                      variant="text"
                      icon="delete"
                      size="sm"
                      color="error"
                      onPress={() => handleDelete(item)}
                    />
                  </View>
                </View>
                <View className="flex-row flex-wrap gap-1.5">
                  <Badge
                    type={(categoryBadgeType[item.category] ?? 'neutral') as any}
                    label={item.category}
                  />
                  <Badge
                    type={(priorityBadgeType[item.priority] ?? 'info') as any}
                    label={item.priority}
                  />
                  <Badge
                    type={(statusBadgeType[item.status] ?? 'neutral') as any}
                    label={item.status}
                  />
                </View>
              </View>
            ))
          )}
        </View>
      )}

      {/* Pagination */}
      {!isPending && data && data.items.length > 0 && (
        <View className="flex-row items-center justify-center gap-4 mt-6" testID="pagination">
          <Button
            variant="outlined"
            label="Previous"
            icon="chevron-left"
            size="sm"
            disabled={page <= 1}
            onPress={() => setPage((p) => Math.max(1, p - 1))}
          />
          <Typography variant="caption" className="text-white/60">
            Page {data.currentPage} of {data.totalPages}
          </Typography>
          <Button
            variant="outlined"
            label="Next"
            icon="chevron-right"
            size="sm"
            disabled={page >= totalPages}
            onPress={() => setPage((p) => p + 1)}
          />
        </View>
      )}

      {/* Form Modal */}
      <TaskFormModal visible={formVisible} onClose={handleCloseForm} editItem={editItem} />
    </ScrollView>
  );
}

export default function DataFetchingScreen() {
  return (
    <ErrorBoundary>
      <DataFetchingContent />
    </ErrorBoundary>
  );
}
