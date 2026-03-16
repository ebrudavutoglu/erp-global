'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

interface AlertDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  variant?: 'error' | 'warning' | 'info';
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  showCancelButton?: boolean;
  isLoading?: boolean;
}

export function AlertDialog({
  isOpen,
  title,
  message,
  variant = 'error',
  onClose,
  onConfirm,
  confirmText = 'OK',
  showCancelButton = false,
  isLoading = false,
}: AlertDialogProps) {
  const variantStyles = {
    error: {
      bg: 'bg-red-100',
      border: 'border-red-300',
      icon: 'text-red-600',
      button: 'bg-red-600 hover:bg-red-700',
    },
    warning: {
      bg: 'bg-yellow-100',
      border: 'border-yellow-300',
      icon: 'text-yellow-600',
      button: 'bg-yellow-600 hover:bg-yellow-700',
    },
    info: {
      bg: 'bg-blue-100',
      border: 'border-blue-300',
      icon: 'text-blue-600',
      button: 'bg-blue-600 hover:bg-blue-700',
    },
  };

  const styles = variantStyles[variant];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`bg-white rounded-lg border-2 ${styles.border} shadow-xl overflow-hidden w-full max-w-md`}>
              {/* Header */}
              <div className={`${styles.bg} ${styles.border} border-b-2 px-6 py-4 flex items-center gap-3`}>
                <AlertCircle className={`w-6 h-6 ${styles.icon}`} />
                <h2 className="text-lg font-bold text-slate-900 flex-1">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-slate-200 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-4">
                <p className="text-slate-600">{message}</p>
              </div>

              {/* Actions */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex gap-2 justify-end">
                {showCancelButton && (
                  <button
                    onClick={onClose}
                    disabled={isLoading}
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-lg transition-colors font-medium disabled:opacity-50"
                  >
                    Cancel
                  </button>
                )}
                {onConfirm && (
                  <button
                    onClick={onConfirm}
                    disabled={isLoading}
                    className={`px-4 py-2 ${styles.button} text-white rounded-lg transition-colors font-medium disabled:opacity-50`}
                  >
                    {isLoading ? 'Loading...' : confirmText}
                  </button>
                )}
                {!onConfirm && (
                  <button
                    onClick={onClose}
                    className={`px-4 py-2 ${styles.button} text-white rounded-lg transition-colors font-medium`}
                  >
                    {confirmText}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
