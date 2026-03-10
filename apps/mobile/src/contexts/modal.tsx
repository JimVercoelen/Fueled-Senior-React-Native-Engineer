import React, { createContext, useContext, useState, useCallback } from 'react';
import { View } from 'react-native';
import Modal from '@/components/feedback/Modal';
import ModalContent from '@/components/feedback/ModalContent';
import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';

type ModalType = 'confirmation' | 'generic';

interface ModalConfig {
  type: ModalType;
  title: string;
  content?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface ModalContextValue {
  showModal: (config: ModalConfig) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<ModalConfig | null>(null);

  const hideModal = useCallback(() => {
    setConfig(null);
  }, []);

  const showModal = useCallback((newConfig: ModalConfig) => {
    setConfig(newConfig);
  }, []);

  const handleConfirm = useCallback(() => {
    config?.onConfirm?.();
    hideModal();
  }, [config, hideModal]);

  const handleCancel = useCallback(() => {
    config?.onCancel?.();
    hideModal();
  }, [config, hideModal]);

  const renderFooter = () => {
    if (!config) return null;

    if (config.type === 'confirmation') {
      return (
        <View className="flex-row justify-end gap-3">
          <Button variant="outlined" label="Cancel" onPress={handleCancel} size="sm" />
          <Button
            variant="contained"
            color="error"
            label="Confirm"
            onPress={handleConfirm}
            size="sm"
          />
        </View>
      );
    }

    return (
      <View className="flex-row justify-end">
        <Button variant="outlined" label="Close" onPress={hideModal} size="sm" />
      </View>
    );
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <Modal visible={!!config} onClose={hideModal}>
        <ModalContent title={config?.title} footer={renderFooter()} onClose={hideModal}>
          {config?.content &&
            (typeof config.content === 'string' ? (
              <Typography variant="body" className="text-gray-400">
                {config.content}
              </Typography>
            ) : (
              config.content
            ))}
        </ModalContent>
      </Modal>
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within ModalProvider');
  return context;
}
