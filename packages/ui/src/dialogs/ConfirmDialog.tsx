'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'danger';
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  onClose,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  isLoading = false,
}: ConfirmDialogProps) {
  const isDestructive = variant === 'danger';
  const confirmButtonColor = isDestructive
    ? 'bg-red-600 hover:bg-red-700'
    : 'bg-blue-600 hover:bg-blue-700';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-lg border-2 border-slate-200 shadow-xl overflow-hidden w-full max-w-md">
              {/* Header */}
              <div className="bg-slate-100 border-b-2 border-slate-200 px-6 py-4 flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-slate-600" />
                <h2 className="text-lg font-bold text-slate-900 flex-1">{title}</h2>
                <button
                  onClick={onClose}
                  disabled={isLoading}
                  className="p-1 hover:bg-slate-200 rounded transition-colors disabled:opacity-50"
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
                <button
                  onClick={onClose}
                  disabled={isLoading}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-lg transition-colors font-medium disabled:opacity-50"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  disabled={isLoading}
                  className={`px-4 py-2 ${confirmButtonColor} text-white rounded-lg transition-colors font-medium disabled:opacity-50`}
                >
                  {isLoading ? 'Loading...' : confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
