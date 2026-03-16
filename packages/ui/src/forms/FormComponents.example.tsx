/**
 * Form Components Example
 *
 * All form components support two patterns:
 * 1. With control prop directly
 * 2. With FormProvider (using useFormContext)
 */

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FormInput,
  FormSelect,
  FormCheckbox,
  FormRadio,
  FormTextarea,
  Button,
} from "@repo/ui";

// ============================================
// Example 1: Using with FormProvider (Recommended)
// ============================================

const SignupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  country: z.string().min(1, "Please select a country"),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  accountType: z.enum(["personal", "business"]),
  bio: z.string().optional(),
});

type SignupFormData = z.infer<typeof SignupSchema>;

function SignupFormWithProvider() {
  const methods = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      country: "",
      acceptTerms: false,
      accountType: "personal",
      bio: "",
    },
  });

  const onSubmit = (data: SignupFormData) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        {/* No need to pass control prop - uses useFormContext internally */}
        <FormInput name="email" label="Email" type="email" required />
        <FormInput
          name="password"
          label="Password"
          type="password"
          required
        />
        <FormInput name="firstName" label="First Name" required />
        <FormInput name="lastName" label="Last Name" required />

        <FormSelect
          name="country"
          label="Country"
          options={[
            { value: "us", label: "United States" },
            { value: "uk", label: "United Kingdom" },
            { value: "ca", label: "Canada" },
            { value: "au", label: "Australia" },
          ]}
          required
        />

        <FormRadio
          name="accountType"
          label="Account Type"
          options={[
            { value: "personal", label: "Personal" },
            { value: "business", label: "Business" },
          ]}
        />

        <FormTextarea
          name="bio"
          label="Bio"
          placeholder="Tell us about yourself..."
        />

        <FormCheckbox
          name="acceptTerms"
          label="I accept the terms and conditions"
        />

        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </form>
    </FormProvider>
  );
}

// ============================================
// Example 2: Using with control prop directly
// ============================================

function SignupFormWithControl() {
  const { control, handleSubmit } = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = (data: SignupFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Pass control prop explicitly */}
      <FormInput
        control={control}
        name="email"
        label="Email"
        type="email"
        required
      />
      <FormInput
        control={control}
        name="password"
        label="Password"
        type="password"
        required
      />
      <FormSelect
        control={control}
        name="country"
        label="Country"
        options={[
          { value: "us", label: "United States" },
          { value: "uk", label: "United Kingdom" },
        ]}
        required
      />

      <Button type="submit" className="w-full">
        Create Account
      </Button>
    </form>
  );
}

// ============================================
// Component API Reference
// ============================================

/**
 * FormInput
 * --------
 * Text input field with optional type (text, email, password, number, date, etc.)
 *
 * Props:
 * - control?: Control<T> (optional if using FormProvider)
 * - name: string (required)
 * - label?: string
 * - type?: "text" | "email" | "password" | "number" | "date" | etc.
 * - error?: string (manual error)
 * - helperText?: string
 * - required?: boolean
 * - placeholder?: string
 * - disabled?: boolean
 * - ... all HTML input attributes
 *
 * Usage:
 * <FormInput name="email" label="Email" type="email" required />
 */

/**
 * FormSelect
 * ----------
 * Select dropdown field
 *
 * Props:
 * - control?: Control<T> (optional if using FormProvider)
 * - name: string (required)
 * - label?: string
 * - options: Array<{ value: string | number; label: string }> (required)
 * - placeholder?: string
 * - error?: string
 * - helperText?: string
 * - required?: boolean
 * - disabled?: boolean
 *
 * Usage:
 * <FormSelect
 *   name="country"
 *   label="Country"
 *   options={[
 *     { value: "us", label: "United States" },
 *     { value: "uk", label: "United Kingdom" },
 *   ]}
 * />
 */

/**
 * FormCheckbox
 * -----------
 * Single checkbox input
 *
 * Props:
 * - control?: Control<T> (optional if using FormProvider)
 * - name: string (required)
 * - label?: string
 * - error?: string
 * - helperText?: string
 * - disabled?: boolean
 *
 * Usage:
 * <FormCheckbox name="acceptTerms" label="I accept the terms" />
 */

/**
 * FormRadio
 * --------
 * Radio button group
 *
 * Props:
 * - control?: Control<T> (optional if using FormProvider)
 * - name: string (required)
 * - label?: string
 * - options: Array<{ value: string | number; label: string }> (required)
 * - direction?: "vertical" | "horizontal" (default: "vertical")
 * - error?: string
 * - helperText?: string
 * - required?: boolean
 *
 * Usage:
 * <FormRadio
 *   name="accountType"
 *   label="Account Type"
 *   options={[
 *     { value: "personal", label: "Personal" },
 *     { value: "business", label: "Business" },
 *   ]}
 * />
 */

/**
 * FormTextarea
 * -----------
 * Multiline text input
 *
 * Props:
 * - control?: Control<T> (optional if using FormProvider)
 * - name: string (required)
 * - label?: string
 * - error?: string
 * - helperText?: string
 * - required?: boolean
 * - placeholder?: string
 * - disabled?: boolean
 * - rows?: number
 * - ... all HTML textarea attributes
 *
 * Usage:
 * <FormTextarea name="bio" label="Bio" rows={4} />
 */
