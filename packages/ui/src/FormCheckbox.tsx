import React from "react";
import { Controller, FieldPath, FieldValues, Control, useFormContext } from "react-hook-form";

interface FormCheckboxProps<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  control?: Control<T>;
  name: FieldPath<T>;
  label?: string;
  error?: string;
  helperText?: string;
}

export const FormCheckbox = React.forwardRef<
  HTMLInputElement,
  FormCheckboxProps<any>
>(
  (
    {
      control: controlProp,
      name,
      label,
      error,
      helperText,
      className,
      ...props
    },
    ref
  ) => {
    const formContext = useFormContext();
    const control = controlProp || formContext?.control;

    if (!control) {
      throw new Error("FormCheckbox must be used with either control prop or FormProvider");
    }

    return (
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error: fieldError } }) => (
          <div className="w-full">
            <div className="flex items-center gap-2">
              <input
                ref={ref}
                type="checkbox"
                {...field}
                checked={field.value || false}
                {...props}
                className={`w-4 h-4 border-gray-300 rounded text-blue-600 transition-colors
                  focus:ring-2 focus:ring-blue-500 focus:ring-offset-0
                  disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
                  ${fieldError || error ? "border-red-500" : ""}
                  ${className || ""}`}
              />
              {label && (
                <label className="text-sm font-medium text-gray-700 cursor-pointer">
                  {label}
                </label>
              )}
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

FormCheckbox.displayName = "FormCheckbox";
