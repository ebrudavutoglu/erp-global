import React from "react";
import { Controller, FieldPath, FieldValues, Control, useFormContext } from "react-hook-form";

interface SelectOption {
  value: string | number;
  label: string;
}

interface FormSelectProps<T extends FieldValues>
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  control?: Control<T>;
  name: FieldPath<T>;
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  required?: boolean;
  placeholder?: string;
}

export const FormSelect = React.forwardRef<
  HTMLSelectElement,
  FormSelectProps<any>
>(
  (
    {
      control: controlProp,
      name,
      label,
      options,
      error,
      helperText,
      required,
      placeholder,
      className,
      ...props
    },
    ref
  ) => {
    const formContext = useFormContext();
    const control = controlProp || formContext?.control;

    if (!control) {
      throw new Error("FormSelect must be used with either control prop or FormProvider");
    }

    return (
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error: fieldError } }) => (
          <div className="w-full">
            {label && (
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
                {required && <span className="text-red-500">*</span>}
              </label>
            )}
            <select
              ref={ref}
              {...field}
              {...props}
              className={`w-full px-3 py-2 border rounded-md text-sm placeholder-gray-400 transition-colors
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
                appearance-none bg-white
                ${fieldError || error ? "border-red-500 bg-red-50" : "border-gray-300"}
                ${className || ""}`}
            >
              {placeholder && (
                <option value="" disabled>
                  {placeholder}
                </option>
              )}
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {(fieldError || error || helperText) && (
              <p
                className={`mt-1 text-xs ${
                  fieldError || error ? "text-red-500" : "text-gray-500"
                }`}
              >
                {fieldError?.message || error || helperText}
              </p>
            )}
          </div>
        )}
      />
    );
  }
);

FormSelect.displayName = "FormSelect";
