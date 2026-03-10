import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { View, Platform } from 'react-native';
import Alert from '@/components/feedback/Alert';

type ToastType = 'success' | 'info' | 'warning' | 'error';

interface Toast {
  type: ToastType;
  title?: string;
  message: string;
}

interface ToastContextValue {
  toast: Toast | null;
  showToast: (toast: Toast) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const hideToast = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setToast(null);
  }, []);

  const showToast = useCallback((newToast: Toast) => {
    // Replace-not-append: clear existing toast and timer
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setToast(newToast);
    timeoutRef.current = setTimeout(() => setToast(null), 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
      {toast && (
        <View
          style={
            Platform.OS === 'web'
              ? {
                  position: 'fixed' as unknown as 'absolute',
                  top: 16,
                  right: 16,
                  maxWidth: 384,
                  zIndex: 50,
                }
              : {
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  right: 16,
                  zIndex: 50,
                }
          }
          pointerEvents="box-none"
        >
          <Alert
            type={toast.type}
            title={toast.title}
            message={toast.message}
            visible
            onDismiss={hideToast}
          />
        </View>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}
