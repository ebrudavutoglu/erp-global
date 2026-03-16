'use client';

import { Controller, FieldValues, Path, Control } from 'react-hook-form';
import {
  Database,
  Users,
  Package,
  Settings,
  ShoppingCart,
  Briefcase,
  BookOpen,
  Calendar,
  MapPin,
  Zap,
  Heart,
  MessageSquare,
  FileText,
  Image,
  Layers,
  Award,
  Ticket,
  TrendingUp,
  DollarSign,
  Clock,
  Target,
  PieChart,
  BarChart3,
  Inbox,
  Archive,
  LucideIcon,
  ChevronDown,
} from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const ICON_OPTIONS: { value: string; label: string; icon: LucideIcon }[] = [
  { value: 'database', label: 'Database', icon: Database },
  { value: 'users', label: 'Users', icon: Users },
  { value: 'package', label: 'Package', icon: Package },
  { value: 'settings', label: 'Settings', icon: Settings },
  { value: 'shopping-cart', label: 'Shopping Cart', icon: ShoppingCart },
  { value: 'briefcase', label: 'Briefcase', icon: Briefcase },
  { value: 'book', label: 'Book', icon: BookOpen },
  { value: 'calendar', label: 'Calendar', icon: Calendar },
  { value: 'map-pin', label: 'Location', icon: MapPin },
  { value: 'zap', label: 'Zap', icon: Zap },
  { value: 'heart', label: 'Heart', icon: Heart },
  { value: 'message', label: 'Message', icon: MessageSquare },
  { value: 'file-text', label: 'File', icon: FileText },
  { value: 'image', label: 'Image', icon: Image },
  { value: 'layers', label: 'Layers', icon: Layers },
  { value: 'award', label: 'Award', icon: Award },
  { value: 'ticket', label: 'Ticket', icon: Ticket },
  { value: 'trending-up', label: 'Trending', icon: TrendingUp },
  { value: 'dollar', label: 'Dollar', icon: DollarSign },
  { value: 'clock', label: 'Clock', icon: Clock },
  { value: 'target', label: 'Target', icon: Target },
  { value: 'pie-chart', label: 'Pie Chart', icon: PieChart },
  { value: 'bar-chart', label: 'Bar Chart', icon: BarChart3 },
  { value: 'inbox', label: 'Inbox', icon: Inbox },
  { value: 'archive', label: 'Archive', icon: Archive },
];

interface FormIconSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function FormIconSelect<T extends FieldValues>({
  name,
  control,
  label = 'Icon',
  placeholder = 'Select an icon',
  disabled = false,
}: FormIconSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const selectedOption = ICON_OPTIONS.find((opt) => opt.value === field.value);
        const SelectedIcon = selectedOption?.icon;

        return (
          <div className="space-y-2">
            {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                disabled={disabled}
                className={`w-full flex items-center justify-between gap-2 px-3 py-2 border border-slate-300 rounded-lg transition-colors ${
                  disabled
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-white hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
                } ${error ? 'border-red-500' : ''}`}
              >
                <div className="flex items-center gap-2">
                  {SelectedIcon && <SelectedIcon className="w-4 h-4 text-slate-600" />}
                  <span className={SelectedIcon ? 'text-slate-900' : 'text-slate-500'}>
                    {selectedOption?.label || placeholder}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.1 }}
                  className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-300 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
                >
                  <div className="p-2 grid grid-cols-3 gap-2">
                    {ICON_OPTIONS.map((option) => {
                      const IconComponent = option.icon;
                      return (
                        <motion.button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            field.onChange(option.value);
                            setIsOpen(false);
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                            field.value === option.value
                              ? 'bg-blue-100 border border-blue-300'
                              : 'hover:bg-slate-100 border border-transparent'
                          }`}
                          title={option.label}
                        >
                          <IconComponent className="w-5 h-5 text-slate-600" />
                          <span className="text-xs text-slate-600 text-center">{option.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>
            {error && <p className="text-sm text-red-500">{error.message}</p>}
          </div>
        );
      }}
    />
  );
}
