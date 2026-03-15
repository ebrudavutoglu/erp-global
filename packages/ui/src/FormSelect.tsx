import React, { useState, useRef, useEffect } from "react";
import { Controller, FieldPath, FieldValues, Control, useFormContext } from "react-hook-form";
import { ChevronDown, X } from "lucide-react";

interface SelectOption {
  value: string | number;
  label: string;
}

interface FormSelectProps<T extends FieldValues> {
  control?: Control<T>;
  name: FieldPath<T>;
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  required?: boolean;
  placeholder?: string;
  searchable?: boolean;
  disabled?: boolean;
}

export const FormSelect = React.forwardRef<
  HTMLDivElement,
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
      placeholder = "Select an option",
      searchable = true,
      disabled = false,
    },
    ref
  ) => {
    const formContext = useFormContext();
    const control = controlProp || formContext?.control;
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);

    if (!control) {
      throw new Error("FormSelect must be used with either control prop or FormProvider");
    }

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setSearchQuery("");
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredOptions = searchable
      ? options.filter((option) =>
          option.label
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : options;

    return (
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error: fieldError } }) => {
          const selectedOption = options.find(
            (opt) => opt.value === field.value
          );

          return (
            <div ref={ref} className="w-full">
              {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {label}
                  {required && <span className="text-red-500">*</span>}
                </label>
              )}

              <div
                ref={containerRef}
                className="relative"
              >
                {/* Trigger Button */}
                <button
                  type="button"
                  onClick={() => !disabled && setIsOpen(!isOpen)}
                  disabled={disabled}
                  className={`w-full px-3 py-2 border rounded-md text-sm text-left transition-colors
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
                    flex items-center justify-between
                    ${
                      fieldError || error
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 bg-white hover:bg-gray-50"
                    }`}
                >
                  <span className={selectedOption ? "text-gray-900" : "text-gray-400"}>
                    {selectedOption?.label || placeholder}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isOpen && !disabled && (
                  <div className="absolute z-50 w-full mt-2 border border-gray-300 rounded-md bg-white shadow-lg">
                    {/* Search Input */}
                    {searchable && (
                      <div className="p-2 border-b border-gray-200">
                        <input
                          type="text"
                          placeholder="Search..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          autoFocus
                        />
                      </div>
                    )}

                    {/* Options List */}
                    <div className="max-h-60 overflow-y-auto">
                      {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              field.onChange(option.value);
                              setIsOpen(false);
                              setSearchQuery("");
                            }}
                            className={`w-full text-left px-3 py-2 text-sm transition-colors
                              ${
                                field.value === option.value
                                  ? "bg-blue-100 text-blue-900 font-medium"
                                  : "hover:bg-gray-100 text-gray-900"
                              }`}
                          >
                            {option.label}
                          </button>
                        ))
                      ) : (
                        <div className="px-3 py-8 text-center text-sm text-gray-500">
                          No options found
                        </div>
                      )}
                    </div>

                    {/* Clear Button */}
                    {field.value && (
                      <div className="border-t border-gray-200 p-2">
                        <button
                          type="button"
                          onClick={() => {
                            field.onChange("");
                            setIsOpen(false);
                            setSearchQuery("");
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors"
                        >
                          <X className="w-4 h-4" />
                          Clear selection
                        </button>
                      </div>
                    )}
                  </div>
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
          );
        }}
      />
    );
  }
);

FormSelect.displayName = "FormSelect";
