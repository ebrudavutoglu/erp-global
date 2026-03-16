'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  onClose: (id: string) => void;
}

const variantConfig: Record<ToastVariant, {
  bg: string;
  border: string;
  icon: any;
  iconColor: string;
  titleColor: string;
  descColor: string;
}> = {
  default: {
    bg: 'bg-slate-900',
    border: 'border-slate-700',
    icon: null,
    iconColor: 'text-slate-400',
    titleColor: 'text-white',
    descColor: 'text-slate-300',
  },
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    icon: CheckCircle,
    iconColor: 'text-green-600',
    titleColor: 'text-green-900',
    descColor: 'text-green-700',
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: AlertCircle,
    iconColor: 'text-red-600',
    titleColor: 'text-red-900',
    descColor: 'text-red-700',
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: AlertTriangle,
    iconColor: 'text-amber-600',
    titleColor: 'text-amber-900',
    descColor: 'text-amber-700',
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: Info,
    iconColor: 'text-blue-600',
    titleColor: 'text-blue-900',
    descColor: 'text-blue-700',
  },
};

export function Toast({
  id,
  title,
  description,
  variant = 'default',
  onClose,
}: ToastProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, x: 0 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
      className={`${config.bg} border ${config.border} rounded-lg shadow-lg overflow-hidden`}
    >
      <div className="flex gap-3 p-4">
        {Icon && (
          <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${config.iconColor}`} />
        )}
        <div className="flex-1 min-w-0">
          {title && (
            <h3 className={`font-semibold ${config.titleColor}`}>
              {title}
            </h3>
          )}
          {description && (
            <p className={`text-sm mt-1 ${config.descColor}`}>
              {description}
            </p>
          )}
        </div>
        <button
          onClick={() => onClose(id)}
          className="flex-shrink-0 p-1 rounded-md transition-colors hover:bg-black/10 dark:hover:bg-white/10"
        >
          <X className={`w-4 h-4 ${config.iconColor}`} />
        </button>
      </div>
    </motion.div>
  );
}
