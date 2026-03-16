'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';

interface SuccessDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
  autoCloseDelay?: number;
  confirmText?: string;
}

export function SuccessDialog({
  isOpen,
  title,
  message,
  onClose,
  autoCloseDelay = 3000,
  confirmText = 'Continue',
}: SuccessDialogProps) {
  // Auto-close after delay
  React.useEffect(() => {
    if (isOpen && autoCloseDelay > 0) {
      const timer = setTimeout(onClose, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoCloseDelay, onClose]);

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
            <div className="bg-white rounded-lg border-2 border-green-300 shadow-xl overflow-hidden w-full max-w-md">
              {/* Header */}
              <div className="bg-green-100 border-b-2 border-green-300 px-6 py-4 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h2 className="text-lg font-bold text-slate-900 flex-1">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-green-200 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-4">
                <p className="text-slate-600">{message}</p>
              </div>

              {/* Progress Bar */}
              {autoCloseDelay > 0 && (
                <motion.div
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: autoCloseDelay / 1000, ease: 'linear' }}
                  className="h-1 bg-green-600 origin-left"
                />
              )}

              {/* Actions */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex gap-2 justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
