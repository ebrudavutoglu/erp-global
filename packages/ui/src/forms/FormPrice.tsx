import React from "react";
import { Controller, FieldPath, FieldValues, Control, useFormContext } from "react-hook-form";

interface FormPriceProps<T extends FieldValues> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  control?: Control<T>;
  name: FieldPath<T>;
  label?: string;
  currency?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const FormPrice = React.forwardRef<
  HTMLInputElement,
  FormPriceProps<any>
>(
  (
    {
      control: controlProp,
      name,
      label,
      currency = "USD",
      error,
      helperText,
      required,
      className,
      ...props
    },
    ref
  ) => {
    const formContext = useFormContext();
    const control = controlProp || formContext?.control;

    if (!control) {
      throw new Error("FormPrice must be used with either control prop or FormProvider");
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
            <div className="relative">
              <input
                ref={ref}
                type="number"
                step="0.01"
                placeholder="0.00"
                {...field}
                {...props}
                className={`w-full px-3 py-2 pr-12 border rounded-md text-sm placeholder-gray-400 transition-colors
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
                  ${fieldError || error ? "border-red-500 bg-red-50" : "border-gray-300 bg-white hover:bg-gray-50"}
                  ${className || ""}`}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-600 pointer-events-none">
                {currency}
              </span>
            </div>
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

FormPrice.displayName = "FormPrice";
