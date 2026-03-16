import React from "react";
import { Controller, FieldPath, FieldValues, Control, useFormContext } from "react-hook-form";

interface RadioOption {
  value: string | number;
  label: string;
}

interface FormRadioProps<T extends FieldValues> {
  control?: Control<T>;
  name: FieldPath<T>;
  label?: string;
  options: RadioOption[];
  error?: string;
  helperText?: string;
  required?: boolean;
  direction?: "horizontal" | "vertical";
}

export const FormRadio = React.forwardRef<
  HTMLDivElement,
  FormRadioProps<any>
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
      direction = "vertical",
    },
    ref
  ) => {
    const formContext = useFormContext();
    const control = controlProp || formContext?.control;

    if (!control) {
      throw new Error("FormRadio must be used with either control prop or FormProvider");
    }

    return (
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error: fieldError } }) => (
          <div ref={ref} className="w-full">
            {label && (
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
                {required && <span className="text-red-500">*</span>}
              </label>
            )}
            <div
              className={`flex gap-4 ${
                direction === "vertical" ? "flex-col" : "flex-row"
              }`}
            >
              {options.map((option) => (
                <div key={option.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    id={`${name}-${option.value}`}
                    value={option.value}
                    checked={field.value === option.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    className={`w-4 h-4 border-gray-300 text-blue-600 transition-colors
                      focus:ring-2 focus:ring-blue-500 focus:ring-offset-0
                      disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
                      ${fieldError || error ? "border-red-500" : ""}`}
                  />
                  <label
                    htmlFor={`${name}-${option.value}`}
                    className="text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            {(fieldError || error || helperText) && (
              <p
                className={`mt-2 text-xs ${
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

FormRadio.displayName = "FormRadio";
