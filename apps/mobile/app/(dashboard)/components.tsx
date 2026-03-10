import React, { useState } from 'react';
import { ScrollView, View, Pressable, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  // Core UI
  Typography,
  Button,
  Card,
  Badge,
  Avatar,
  Divider,
  Table,
  // Form Controls
  TextField,
  Select,
  MultiSelect,
  Toggle,
  Checkbox,
  // Feedback
  Modal,
  ModalContent,
  Alert,
  // Layout
  List,
  Tabs,
  Accordion,
  AccordionItem,
  Dropdown,
} from '@/components';

// ===== Form Controls demo data =====

const ROLE_OPTIONS = [
  { value: 'designer', label: 'Designer' },
  { value: 'developer', label: 'Developer' },
  { value: 'manager', label: 'Manager' },
  { value: 'product-owner', label: 'Product Owner' },
  { value: 'qa', label: 'QA' },
];

const SKILL_OPTIONS = [
  { value: 'react', label: 'React' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'nodejs', label: 'Node.js' },
  { value: 'graphql', label: 'GraphQL' },
  { value: 'python', label: 'Python' },
  { value: 'rust', label: 'Rust' },
  { value: 'go', label: 'Go' },
  { value: 'kotlin', label: 'Kotlin' },
];

const demoSchema = yup.object({
  name: yup.string().required().min(2, 'Name must be at least 2 characters'),
  email: yup.string().required().email('Invalid email address'),
  role: yup.string().required('Please select a role').min(1, 'Please select a role'),
  skills: yup.array().of(yup.string().required()).min(1, 'Select at least one skill').required(),
  notifications: yup.boolean().required(),
  terms: yup.boolean().oneOf([true], 'You must accept the terms').required(),
});

type DemoForm = yup.InferType<typeof demoSchema>;

function CodeSnippet({ code }: { code: string }) {
  const [open, setOpen] = useState(false);

  return (
    <View className="mt-2">
      <Pressable onPress={() => setOpen(!open)} className="flex-row items-center gap-1">
        <MaterialIcons
          name={open ? 'expand-less' : 'code'}
          size={16}
          color="rgba(255,255,255,0.3)"
        />
        <Text className="text-white/30 text-xs font-body">{open ? 'Hide Code' : 'Show Code'}</Text>
      </Pressable>
      {open && (
        <View className="bg-white/5 rounded-xl p-3 mt-2">
          <Text className="text-neutral-400 text-xs font-body" style={{ fontFamily: 'monospace' }}>
            {code}
          </Text>
        </View>
      )}
    </View>
  );
}

function SectionHeading({ children }: { children: string }) {
  return (
    <View className="mt-16 mb-4">
      <Divider />
      <Typography variant="h1" className="mt-6">
        {children}
      </Typography>
    </View>
  );
}

function SubSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View className="mt-10">
      <Typography variant="label" className="mb-4 text-white/50">
        {label}
      </Typography>
      {children}
    </View>
  );
}

export default function ComponentsScreen() {
  const [activeTab, setActiveTab] = useState('overview');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView
      className="flex-1 bg-black"
      contentContainerClassName="px-4 py-6 pb-20 max-w-3xl mx-auto w-full"
    >
      <Typography variant="h1">Component Library</Typography>
      <Typography variant="body" className="text-neutral-400 mt-2 mb-6">
        Interactive playground showcasing all UI components. Built with NativeWind, Reanimated, and
        react-hook-form.
      </Typography>

      {/* ===== CORE UI SECTION ===== */}
      <Typography variant="h2">Core UI</Typography>

      {/* Typography */}
      <SubSection label="Typography">
        <View className="gap-3">
          <View>
            <Typography variant="caption" className="mb-1 text-white/40">
              h1
            </Typography>
            <Typography variant="h1">Heading One</Typography>
          </View>
          <View>
            <Typography variant="caption" className="mb-1 text-white/40">
              h2
            </Typography>
            <Typography variant="h2">Heading Two</Typography>
          </View>
          <View>
            <Typography variant="caption" className="mb-1 text-white/40">
              h3
            </Typography>
            <Typography variant="h3">Heading Three</Typography>
          </View>
          <View>
            <Typography variant="caption" className="mb-1 text-white/40">
              body
            </Typography>
            <Typography variant="body">
              Body text using Inter Regular for readable content.
            </Typography>
          </View>
          <View>
            <Typography variant="caption" className="mb-1 text-white/40">
              caption
            </Typography>
            <Typography variant="caption">Caption text for metadata</Typography>
          </View>
          <View>
            <Typography variant="caption" className="mb-1 text-white/40">
              label
            </Typography>
            <Typography variant="label">Label Text</Typography>
          </View>
          <View>
            <Typography variant="caption" className="mb-1 text-white/40">
              button
            </Typography>
            <Typography variant="button" className="text-white">
              Button Text
            </Typography>
          </View>
        </View>
        <CodeSnippet
          code={`<Typography variant="h1">Heading</Typography>\n<Typography variant="body">Body text</Typography>\n<Typography variant="caption">Caption</Typography>`}
        />
      </SubSection>

      {/* Button */}
      <SubSection label="Button">
        <View className="gap-6">
          {/* Basic Variants */}
          <View>
            <Typography variant="caption" className="mb-2 text-white/40">
              Variants
            </Typography>
            <View className="flex-row flex-wrap gap-3 items-center">
              <Button variant="text" label="Text" onPress={() => {}} />
              <Button variant="contained" label="Contained" onPress={() => {}} />
              <Button variant="outlined" label="Outlined" onPress={() => {}} />
            </View>
          </View>

          {/* Text Variant States */}
          <View>
            <Typography variant="caption" className="mb-2 text-white/40">
              Text
            </Typography>
            <View className="flex-row flex-wrap gap-3 items-center">
              <Button variant="text" label="Primary" onPress={() => {}} />
              <Button variant="text" label="Disabled" disabled />
              <Button variant="text" label="Link" link onPress={() => {}} />
              <Button variant="text" label="Loading" loading />
            </View>
          </View>

          {/* Contained Variant States */}
          <View>
            <Typography variant="caption" className="mb-2 text-white/40">
              Contained
            </Typography>
            <View className="flex-row flex-wrap gap-3 items-center">
              <Button variant="contained" label="Contained" onPress={() => {}} />
              <Button variant="contained" label="Disabled" disabled />
              <Button variant="contained" label="Link" link onPress={() => {}} />
              <Button variant="contained" label="Loading" loading />
            </View>
          </View>

          {/* Outlined Variant States */}
          <View>
            <Typography variant="caption" className="mb-2 text-white/40">
              Outlined
            </Typography>
            <View className="flex-row flex-wrap gap-3 items-center">
              <Button variant="outlined" label="Outlined" onPress={() => {}} />
              <Button variant="outlined" label="Disabled" disabled />
              <Button variant="outlined" label="Link" link onPress={() => {}} />
              <Button variant="outlined" label="Loading" loading />
            </View>
          </View>

          {/* Colors */}
          <View>
            <Typography variant="caption" className="mb-2 text-white/40">
              Colors
            </Typography>
            <View className="flex-row flex-wrap gap-3 items-center">
              <Button variant="contained" color="primary" label="Primary" onPress={() => {}} />
              <Button variant="contained" color="secondary" label="Secondary" onPress={() => {}} />
              <Button variant="contained" color="success" label="Success" onPress={() => {}} />
              <Button variant="contained" color="error" label="Error" onPress={() => {}} />
            </View>
          </View>

          {/* Sizes */}
          <View>
            <Typography variant="caption" className="mb-2 text-white/40">
              Sizes
            </Typography>
            <View className="gap-3">
              <View className="flex-row flex-wrap gap-3 items-center">
                <Button variant="text" size="sm" label="Small" onPress={() => {}} />
                <Button variant="text" size="md" label="Medium" onPress={() => {}} />
                <Button variant="text" size="lg" label="Large" onPress={() => {}} />
              </View>
              <View className="flex-row flex-wrap gap-3 items-center">
                <Button variant="outlined" size="sm" label="Small" onPress={() => {}} />
                <Button variant="outlined" size="md" label="Medium" onPress={() => {}} />
                <Button variant="outlined" size="lg" label="Large" onPress={() => {}} />
              </View>
              <View className="flex-row flex-wrap gap-3 items-center">
                <Button variant="contained" size="sm" label="Small" onPress={() => {}} />
                <Button variant="contained" size="md" label="Medium" onPress={() => {}} />
                <Button variant="contained" size="lg" label="Large" onPress={() => {}} />
              </View>
            </View>
          </View>

          {/* With Icons */}
          <View>
            <Typography variant="caption" className="mb-2 text-white/40">
              With Icons
            </Typography>
            <View className="flex-row flex-wrap gap-3 items-center">
              <Button variant="contained" label="Add" icon="add" onPress={() => {}} />
              <Button variant="outlined" label="Edit" icon="edit" onPress={() => {}} />
              <Button
                variant="text"
                label="Delete"
                icon="delete"
                color="error"
                onPress={() => {}}
              />
            </View>
          </View>

          {/* Icon Button */}
          <View>
            <Typography variant="caption" className="mb-2 text-white/40">
              Icon Button
            </Typography>
            <View className="flex-row flex-wrap gap-3 items-center">
              <Button variant="contained" icon="add" onPress={() => {}} />
              <Button variant="outlined" icon="edit" onPress={() => {}} />
              <Button variant="text" icon="delete" color="error" onPress={() => {}} />
              <Button variant="contained" icon="search" color="secondary" onPress={() => {}} />
            </View>
          </View>
        </View>
        <CodeSnippet
          code={`<Button variant="contained" label="Save" onPress={handleSave} />\n<Button variant="outlined" label="Cancel" onPress={handleCancel} />\n<Button variant="text" label="Link" link onPress={handleLink} />\n<Button variant="contained" icon="add" /> {/* icon-only */}`}
        />
      </SubSection>

      {/* Card */}
      <SubSection label="Card">
        <View className="gap-4">
          <Card
            header={<Typography variant="h3">Card Title</Typography>}
            footer={
              <View className="flex-row justify-end gap-3">
                <Button variant="text" size="sm" label="Cancel" onPress={() => {}} />
                <Button variant="contained" size="sm" label="Confirm" onPress={() => {}} />
              </View>
            }
          >
            <Typography variant="body" className="text-neutral-300">
              This is the card body. It supports any content between the header and footer slots.
            </Typography>
          </Card>

          <Card onPress={() => {}}>
            <Typography variant="body" className="text-white">
              Pressable card — tap to see scale animation.
            </Typography>
          </Card>
        </View>
        <CodeSnippet
          code={`<Card header={<Typography variant="h3">Title</Typography>}>\n  <Typography variant="body">Content</Typography>\n</Card>`}
        />
      </SubSection>

      {/* Badge */}
      <SubSection label="Badge">
        <View className="flex-row flex-wrap gap-3 items-center">
          <Badge type="success" label="Success" />
          <Badge type="info" label="Info" />
          <Badge type="warning" label="Warning" />
          <Badge type="error" label="Error" />
        </View>
        <CodeSnippet
          code={`<Badge type="success" label="Active" />\n<Badge type="error" label="Failed" />\n<Badge type="warning" label="Pending" />`}
        />
      </SubSection>

      {/* Avatar */}
      <SubSection label="Avatar">
        <View className="gap-4">
          <View className="flex-row flex-wrap gap-3 items-center">
            <Avatar name="Jim V" size="sm" />
            <Avatar name="Sarah Connor" size="md" />
            <Avatar name="Tony Stark" size="lg" />
          </View>
          <View className="flex-row flex-wrap gap-3 items-center">
            <Avatar imageUri="https://i.pravatar.cc/100" size="md" />
            <Typography variant="caption">Image mode</Typography>
          </View>
        </View>
        <CodeSnippet
          code={`<Avatar name="Jim V" size="lg" />\n<Avatar imageUri="https://example.com/photo.jpg" size="md" />`}
        />
      </SubSection>

      {/* Divider */}
      <SubSection label="Divider">
        <View className="gap-3">
          <Typography variant="body">Content above divider</Typography>
          <Divider />
          <Typography variant="body">Content below divider</Typography>
        </View>
        <CodeSnippet code={`<Divider />\n<Divider className="my-4" />`} />
      </SubSection>

      {/* ===== FORM CONTROLS SECTION ===== */}
      <SectionHeading>Form Controls</SectionHeading>

      <FormControlsSection />

      {/* ===== FEEDBACK SECTION ===== */}
      <SectionHeading>Feedback</SectionHeading>

      {/* Modal */}
      <SubSection label="Modal">
        <View className="gap-4">
          <Button
            variant="outlined"
            label="Open Modal"
            icon="open-in-new"
            onPress={() => setModalVisible(true)}
          />
          <Modal visible={modalVisible} onClose={() => setModalVisible(false)}>
            <ModalContent
              title="Demo Modal"
              onClose={() => setModalVisible(false)}
              footer={
                <View className="flex-row justify-end gap-3">
                  <Button
                    variant="outlined"
                    size="sm"
                    label="Cancel"
                    onPress={() => setModalVisible(false)}
                  />
                  <Button
                    variant="contained"
                    size="sm"
                    label="Confirm"
                    onPress={() => setModalVisible(false)}
                  />
                </View>
              }
            >
              <Typography variant="body">
                This modal demonstrates the centered overlay with a semi-transparent backdrop. Tap
                the backdrop or the close icon to dismiss.
              </Typography>
            </ModalContent>
          </Modal>
        </View>
        <CodeSnippet
          code={`<Modal visible={visible} onClose={() => setVisible(false)}>\n  <ModalContent\n    title="Dialog"\n    onClose={() => setVisible(false)}\n    footer={<Button label="OK" onPress={close} />}\n  >\n    <Typography>Modal body content</Typography>\n  </ModalContent>\n</Modal>`}
        />
      </SubSection>

      {/* Alert */}
      <SubSection label="Alert">
        <View className="gap-3">
          <Alert
            type="success"
            title="Success"
            message="Your changes have been saved successfully."
          />
          <Alert
            type="info"
            title="Information"
            message="A new version is available. Update to get the latest features."
          />
          <Alert type="warning" title="Warning" message="Your session will expire in 5 minutes." />
          <Alert
            type="error"
            title="Error"
            message="Failed to connect to the server. Please try again later."
            onDismiss={() => {}}
          />
        </View>
        <CodeSnippet
          code={`<Alert type="success" title="Saved" message="Changes saved." />\n<Alert type="error" message="Something went wrong." onDismiss={dismiss} />\n<Alert type="warning" visible={show} message="Session expiring." />`}
        />
      </SubSection>

      {/* ===== LAYOUT SECTION ===== */}
      <SectionHeading>Layout</SectionHeading>

      {/* Table */}
      <SubSection label="Table">
        <Table
          headers={['Name', 'Role', 'Status']}
          rows={[
            ['Alice Johnson', 'Engineer', 'Active'],
            ['Bob Smith', 'Designer', 'Remote'],
            ['Carol White', 'PM', 'Away'],
            ['Dave Brown', 'QA', 'Offline'],
          ]}
        />
        <CodeSnippet
          code={`<Table\n  headers={['Name', 'Role', 'Status']}\n  rows={[\n    ['Alice', 'Engineer', 'Active'],\n    ['Bob', 'Designer', 'Remote'],\n  ]}\n/>`}
        />
      </SubSection>

      {/* List */}
      <SubSection label="List">
        <View className="border border-white/15 rounded-2xl overflow-hidden">
          <List
            items={[
              { id: '1', content: <Typography variant="body">Dashboard overview</Typography> },
              { id: '2', content: <Typography variant="body">User management</Typography> },
              { id: '3', content: <Typography variant="body">Analytics reports</Typography> },
              { id: '4', content: <Typography variant="body">System settings</Typography> },
              { id: '5', content: <Typography variant="body">Notifications</Typography> },
            ]}
            onItemPress={(id) => console.log('Pressed item:', id)}
          />
        </View>
        <CodeSnippet
          code={`<List\n  items={[\n    { id: '1', content: <Typography>Item one</Typography> },\n    { id: '2', content: <Typography>Item two</Typography> },\n  ]}\n  onItemPress={(id) => console.log(id)}\n  divider\n/>`}
        />
      </SubSection>

      {/* Dropdown */}
      <SubSection label="Dropdown">
        <Dropdown
          trigger={<Button variant="outlined" label="Actions" icon="more-vert" />}
          items={[
            { key: 'edit', label: 'Edit', icon: 'edit', onPress: () => {} },
            { key: 'duplicate', label: 'Duplicate', icon: 'content-copy', onPress: () => {} },
            { key: 'share', label: 'Share', icon: 'share', onPress: () => {} },
            {
              key: 'delete',
              label: 'Delete',
              icon: 'delete',
              onPress: () => {},
              destructive: true,
            },
          ]}
        />
        <CodeSnippet
          code={`<Dropdown\n  trigger={<Button label="Actions" icon="more-vert" />}\n  items={[\n    { key: 'edit', label: 'Edit', icon: 'edit', onPress: handleEdit },\n    { key: 'delete', label: 'Delete', icon: 'delete', onPress: handleDelete, destructive: true },\n  ]}\n/>`}
        />
      </SubSection>

      {/* Tabs */}
      <SubSection label="Tabs">
        <View className="border border-white/15 rounded-2xl overflow-hidden">
          <Tabs
            tabs={[
              { key: 'overview', label: 'Overview' },
              { key: 'details', label: 'Details' },
              { key: 'settings', label: 'Settings' },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <View className="p-4">
            {activeTab === 'overview' && (
              <Typography variant="body">
                Overview content: A high-level summary of your project status and key metrics.
              </Typography>
            )}
            {activeTab === 'details' && (
              <Typography variant="body">
                Details content: In-depth information about individual items, logs, and history.
              </Typography>
            )}
            {activeTab === 'settings' && (
              <Typography variant="body">
                Settings content: Configure preferences, notifications, and account options.
              </Typography>
            )}
          </View>
        </View>
        <CodeSnippet
          code={`<Tabs\n  tabs={[\n    { key: 'overview', label: 'Overview' },\n    { key: 'details', label: 'Details' },\n  ]}\n  activeTab={activeTab}\n  onTabChange={setActiveTab}\n/>`}
        />
      </SubSection>

      {/* Accordion */}
      <SubSection label="Accordion">
        <Accordion>
          <AccordionItem title="Getting Started" defaultOpen>
            <Typography variant="body">
              Welcome to the component library. This section covers setup instructions, project
              structure, and initial configuration steps to get you up and running quickly.
            </Typography>
          </AccordionItem>
          <AccordionItem title="API Reference">
            <Typography variant="body">
              Detailed documentation for all component props, methods, and events. Each component
              follows consistent patterns for styling and interaction.
            </Typography>
          </AccordionItem>
          <AccordionItem title="Advanced Usage">
            <Typography variant="body">
              Learn about composition patterns, custom theming, animation integration, and
              performance optimization techniques for complex UIs.
            </Typography>
          </AccordionItem>
        </Accordion>
        <CodeSnippet
          code={`<Accordion>\n  <AccordionItem title="Section" defaultOpen>\n    <Typography variant="body">Content</Typography>\n  </AccordionItem>\n</Accordion>`}
        />
      </SubSection>
    </ScrollView>
  );
}

// ===== Form Controls Section =====

function TextFieldDemos() {
  const { control, setError } = useForm({
    defaultValues: {
      textDefault: '',
      textFilled: 'Jane Smith',
      textError: 'bad',
      textDisabled: 'Cannot edit',
      textMultiline: '',
    },
  });

  // Set an error for the error demo
  React.useEffect(() => {
    setError('textError', { message: 'This field has a validation error' });
  }, [setError]);

  return (
    <SubSection label="TextField">
      <View className="gap-4">
        <TextField
          control={control}
          name="textDefault"
          label="Default"
          placeholder="Enter your name"
          helperText="This is a helper text"
        />
        <TextField
          control={control}
          name="textFilled"
          label="Filled"
          placeholder="Enter your name"
        />
        <TextField
          control={control}
          name="textError"
          label="Error State"
          placeholder="Enter value"
        />
        <TextField control={control} name="textDisabled" label="Disabled" disabled />
        <TextField
          control={control}
          name="textMultiline"
          label="Multiline"
          placeholder="Write a longer message..."
          multiline
          numberOfLines={3}
        />
      </View>
      <CodeSnippet
        code={`<TextField\n  control={control}\n  name="email"\n  label="Email"\n  placeholder="john@example.com"\n/>`}
      />
    </SubSection>
  );
}

function SelectDemos() {
  const { control, setError } = useForm({
    defaultValues: {
      selectDefault: '',
      selectPrefilled: 'developer',
      selectError: '',
    },
  });

  React.useEffect(() => {
    setError('selectError', { message: 'Please select a role' });
  }, [setError]);

  return (
    <SubSection label="Select">
      <View className="gap-4">
        <Select
          control={control}
          name="selectDefault"
          label="Role"
          placeholder="Choose a role"
          options={ROLE_OPTIONS}
        />
        <Select
          control={control}
          name="selectPrefilled"
          label="Pre-selected"
          options={ROLE_OPTIONS}
        />
        <Select
          control={control}
          name="selectError"
          label="Error State"
          placeholder="Choose a role"
          options={ROLE_OPTIONS}
        />
      </View>
      <CodeSnippet
        code={`<Select\n  control={control}\n  name="role"\n  label="Role"\n  options={[\n    { value: 'designer', label: 'Designer' },\n    { value: 'developer', label: 'Developer' },\n  ]}\n/>`}
      />
    </SubSection>
  );
}

function MultiSelectDemos() {
  const { control } = useForm({
    defaultValues: {
      multiDefault: [],
      multiPrefilled: ['react', 'typescript', 'nodejs'],
    },
  });

  return (
    <SubSection label="MultiSelect">
      <View className="gap-4">
        <MultiSelect
          control={control}
          name="multiDefault"
          label="Skills"
          placeholder="Select your skills"
          options={SKILL_OPTIONS}
        />
        <MultiSelect
          control={control}
          name="multiPrefilled"
          label="Pre-selected (remove chips to test)"
          options={SKILL_OPTIONS}
        />
      </View>
      <CodeSnippet
        code={`<MultiSelect\n  control={control}\n  name="skills"\n  label="Skills"\n  options={[\n    { value: 'react', label: 'React' },\n    { value: 'typescript', label: 'TypeScript' },\n  ]}\n/>`}
      />
    </SubSection>
  );
}

function ToggleDemos() {
  const { control } = useForm({
    defaultValues: {
      emailNotifications: false,
    },
  });

  return (
    <SubSection label="Toggle">
      <Toggle
        control={control}
        name="emailNotifications"
        label="Email Notifications"
        helperText="Receive email updates about your account"
      />
      <CodeSnippet
        code={`<Toggle\n  control={control}\n  name="notifications"\n  label="Email Notifications"\n/>`}
      />
    </SubSection>
  );
}

function CheckboxDemos() {
  const { control } = useForm({
    defaultValues: {
      terms: false,
      newsletter: true,
    },
  });

  return (
    <SubSection label="Checkbox">
      <View className="gap-4">
        <Checkbox control={control} name="terms" label="I accept the terms and conditions" />
        <Checkbox control={control} name="newsletter" label="Subscribe to newsletter" />
      </View>
      <CodeSnippet
        code={`<Checkbox\n  control={control}\n  name="terms"\n  label="I accept the terms and conditions"\n/>`}
      />
    </SubSection>
  );
}

function MiniFormDemo() {
  const [submitted, setSubmitted] = useState(false);

  const { control, handleSubmit, reset } = useForm<DemoForm>({
    resolver: yupResolver(demoSchema),
    defaultValues: {
      name: '',
      email: '',
      role: '',
      skills: [],
      notifications: false,
      terms: false,
    },
  });

  const onSubmit = (_data: DemoForm) => {
    setSubmitted(true);
  };

  return (
    <SubSection label="Demo">
      <View className="bg-white/5 border border-white/15 rounded-2xl p-4 gap-4">
        <Typography variant="caption" className="text-white/40">
          Complete form with yup validation -- submit to see error states
        </Typography>

        <TextField control={control} name="name" label="Full Name" placeholder="John Doe" />
        <TextField control={control} name="email" label="Email" placeholder="john@example.com" />
        <Select
          control={control}
          name="role"
          label="Role"
          placeholder="Select your role"
          options={ROLE_OPTIONS}
        />
        <MultiSelect
          control={control}
          name="skills"
          label="Skills"
          placeholder="Select your skills"
          options={SKILL_OPTIONS}
        />
        <Toggle control={control} name="notifications" label="Email Notifications" />
        <Checkbox control={control} name="terms" label="I accept the terms and conditions" />

        <View className="flex-row gap-3 mt-2">
          <Button variant="contained" label="Submit" onPress={handleSubmit(onSubmit)} />
          <Button
            variant="outlined"
            label="Reset"
            onPress={() => {
              reset();
              setSubmitted(false);
            }}
          />
        </View>

        {submitted && (
          <Alert
            type="success"
            title="Success"
            message="Form submitted successfully!"
            visible={submitted}
            onDismiss={() => setSubmitted(false)}
          />
        )}
      </View>
      <CodeSnippet
        code={`const schema = yup.object({\n  name: yup.string().required().min(2),\n  email: yup.string().required().email(),\n  role: yup.string().required(),\n  skills: yup.array().of(yup.string()).min(1),\n  terms: yup.boolean().oneOf([true]),\n});\n\nconst { control, handleSubmit } = useForm({\n  resolver: yupResolver(schema),\n});\n\n<TextField control={control} name="name" label="Name" />\n<Select control={control} name="role" options={roles} />\n<Button label="Submit" onPress={handleSubmit(onSubmit)} />`}
      />
    </SubSection>
  );
}

function FormControlsSection() {
  return (
    <View>
      <TextFieldDemos />
      <SelectDemos />
      <MultiSelectDemos />
      <ToggleDemos />
      <CheckboxDemos />
      <MiniFormDemo />
    </View>
  );
}
