# @repo/ui - Shared UI Components

This package contains reusable React UI components that are used across the ERP platform.

## Components

### Form Components

All form components are built on top of `react-hook-form` and support both `Control` prop and `useFormContext` patterns.

#### FormInput
Text input field supporting all HTML input types (text, email, password, number, date, etc.)

```tsx
import { FormInput } from "@repo/ui";
import { useForm, FormProvider } from "react-hook-form";

function MyForm() {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <FormInput
        name="email"
        label="Email"
        type="email"
        required
      />
    </FormProvider>
  );
}
```

#### FormSelect
Select dropdown with predefined options.

```tsx
<FormSelect
  name="country"
  label="Country"
  options={[
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
  ]}
  required
/>
```

#### FormCheckbox
Single checkbox input.

```tsx
<FormCheckbox
  name="acceptTerms"
  label="I accept the terms and conditions"
/>
```

#### FormRadio
Radio button group.

```tsx
<FormRadio
  name="accountType"
  label="Account Type"
  options={[
    { value: "personal", label: "Personal" },
    { value: "business", label: "Business" },
  ]}
  direction="vertical"
/>
```

#### FormTextarea
Multiline text input.

```tsx
<FormTextarea
  name="bio"
  label="Bio"
  placeholder="Tell us about yourself..."
  rows={4}
/>
```

### Button
Styled button component with variants and sizes.

```tsx
import { Button } from "@repo/ui";

<Button variant="primary" size="md">
  Click me
</Button>
```

## Usage Patterns

### Pattern 1: With FormProvider (Recommended)

```tsx
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormInput, FormSelect } from "@repo/ui";

const schema = z.object({
  email: z.string().email(),
  country: z.string(),
});

function MyForm() {
  const methods = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormInput name="email" label="Email" type="email" />
        <FormSelect
          name="country"
          label="Country"
          options={countries}
        />
      </form>
    </FormProvider>
  );
}
```

### Pattern 2: With Control Prop

```tsx
import { useForm } from "react-hook-form";
import { FormInput, FormSelect } from "@repo/ui";

function MyForm() {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput control={control} name="email" label="Email" />
      <FormSelect control={control} name="country" label="Country" />
    </form>
  );
}
```

## Features

- ✅ Full TypeScript support with generic types
- ✅ Zod validation integration with react-hook-form
- ✅ Flexible control pattern (FormProvider or control prop)
- ✅ Built-in error handling and display
- ✅ Helper text and required field indicators
- ✅ Accessible form elements with proper labels
- ✅ Tailwind CSS styling
- ✅ Support for disabled and read-only states

## Common Props

All form components share these common props:

- `name` (required): Field name for form state
- `control?`: React Hook Form control (optional if using FormProvider)
- `label?`: Field label
- `error?`: Manual error message
- `helperText?`: Helper text below the field
- `required?`: Show required indicator on label
- `disabled?`: Disable the input

## Styling

Components use Tailwind CSS for styling. Colors and spacing can be customized by modifying the component files or by using Tailwind's configuration.

Default colors:
- Border: `border-gray-300`
- Focus ring: `ring-blue-500`
- Error: `text-red-500`
- Text: `text-gray-700`
