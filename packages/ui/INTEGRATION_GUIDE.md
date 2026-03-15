# Form Components Integration Guide

This guide shows how to integrate the new form components into your existing forms.

## Migration Example: Auth Register Form

### Before: Using React State

```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function AuthRegisterForm() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) {
      setError('Please accept the terms');
      return;
    }
    // ... submit logic
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
      />
      {error && <div>{error}</div>}
      <button type="submit">Register</button>
    </form>
  );
}
```

### After: Using Form Components with react-hook-form

```tsx
'use client';

import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormInput, FormCheckbox, Button } from '@repo/ui';

// Define your validation schema
const RegisterSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

type RegisterFormData = z.infer<typeof RegisterSchema>;

export function AuthRegisterForm() {
  const router = useRouter();
  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // Your API call here
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push('/workspaces');
      }
    } catch (error) {
      methods.setError('root', { message: 'Registration failed' });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormInput
          name="firstName"
          label="First Name"
          placeholder="John"
          required
        />

        <FormInput
          name="lastName"
          label="Last Name"
          placeholder="Doe"
          required
        />

        <FormInput
          name="email"
          label="Email"
          type="email"
          placeholder="john@example.com"
          required
        />

        <FormInput
          name="password"
          label="Password"
          type="password"
          required
        />

        <FormCheckbox
          name="acceptTerms"
          label="I accept the terms and conditions"
        />

        {methods.formState.errors.root && (
          <div className="text-red-500 text-sm">
            {methods.formState.errors.root.message}
          </div>
        )}

        <Button
          type="submit"
          disabled={methods.formState.isSubmitting}
        >
          {methods.formState.isSubmitting ? 'Loading...' : 'Register'}
        </Button>
      </form>
    </FormProvider>
  );
}
```

## Benefits of Migration

### 1. **Reduced Boilerplate**
- No need to manage multiple `useState` calls
- Automatic error handling from validation schema
- Centralized form state management

### 2. **Better Validation**
- Declarative schema with Zod
- Real-time validation feedback
- Type-safe form data

### 3. **Consistency**
- All forms use the same components
- Unified error display and styling
- Consistent accessibility features

### 4. **Easier Testing**
- Form data is predictable and typed
- Validation is testable separately
- Less internal state to mock

### 5. **Better Developer Experience**
- IntelliSense for form fields
- Clear error messages
- Less code to maintain

## Step-by-Step Migration

### Step 1: Define Your Schema

```tsx
import { z } from 'zod';

const MyFormSchema = z.object({
  fieldName: z.string().min(1, 'Field is required'),
  email: z.string().email('Invalid email'),
  // ... more fields
});

type MyFormData = z.infer<typeof MyFormSchema>;
```

### Step 2: Set Up React Hook Form

```tsx
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

function MyForm() {
  const methods = useForm<MyFormData>({
    resolver: zodResolver(MyFormSchema),
    defaultValues: {
      fieldName: '',
      email: '',
    },
  });

  const onSubmit = (data: MyFormData) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {/* Components go here */}
      </form>
    </FormProvider>
  );
}
```

### Step 3: Replace Input Fields

Replace manual inputs with form components:

```tsx
// Before
<input
  value={field}
  onChange={(e) => setField(e.target.value)}
  placeholder="Enter value"
/>

// After
<FormInput name="field" placeholder="Enter value" required />
```

### Step 4: Handle Form State

```tsx
// Access form state
const { isSubmitting, errors } = methods.formState;

// Show loading state
<Button type="submit" disabled={isSubmitting}>
  {isSubmitting ? 'Loading...' : 'Submit'}
</Button>

// Show error message
{errors.root && <div>{errors.root.message}</div>}
```

## Real-World Example: User Profile Form

```tsx
import { z } from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormInput,
  FormSelect,
  FormCheckbox,
  FormTextarea,
  Button
} from '@repo/ui';

const ProfileSchema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  country: z.string().min(1, 'Select a country'),
  bio: z.string().optional(),
  newsletter: z.boolean().default(false),
});

type ProfileFormData = z.infer<typeof ProfileSchema>;

export function UserProfileForm() {
  const methods = useForm<ProfileFormData>({
    resolver: zodResolver(ProfileSchema),
  });

  const onSubmit = async (data: ProfileFormData) => {
    const response = await fetch('/api/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // Show success message
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormInput name="firstName" label="First Name" required />
          <FormInput name="lastName" label="Last Name" required />
        </div>

        <FormInput
          name="email"
          label="Email"
          type="email"
          required
        />

        <FormSelect
          name="country"
          label="Country"
          options={[
            { value: 'us', label: 'United States' },
            { value: 'uk', label: 'United Kingdom' },
            // ... more countries
          ]}
          required
        />

        <FormTextarea
          name="bio"
          label="Bio"
          placeholder="Tell us about yourself"
          rows={4}
        />

        <FormCheckbox
          name="newsletter"
          label="Subscribe to our newsletter"
        />

        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => window.history.back()}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={methods.formState.isSubmitting}
          >
            Save Profile
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
```

## Common Patterns

### Conditional Fields

```tsx
const accountType = methods.watch('accountType');

return (
  <>
    <FormRadio
      name="accountType"
      options={[
        { value: 'personal', label: 'Personal' },
        { value: 'business', label: 'Business' },
      ]}
    />

    {accountType === 'business' && (
      <FormInput name="companyName" label="Company Name" required />
    )}
  </>
);
```

### Dynamic Fields

```tsx
const { fields, append, remove } = useFieldArray({
  control: methods.control,
  name: 'items',
});

return (
  <>
    {fields.map((field, index) => (
      <div key={field.id} className="flex gap-2">
        <FormInput name={`items.${index}.name`} />
        <button onClick={() => remove(index)}>Remove</button>
      </div>
    ))}
    <button onClick={() => append({ name: '' })}>Add Item</button>
  </>
);
```

## Tips & Best Practices

1. **Always use Zod schemas** - Provides better validation and type safety
2. **Keep schemas close to forms** - Makes it easier to maintain
3. **Use descriptive error messages** - Help users understand what went wrong
4. **Test validation separately** - Schema validation is pure logic
5. **Show loading states** - Disable form during submission
6. **Handle errors gracefully** - Display user-friendly error messages
7. **Use `watch()` for conditional fields** - Better than manual state management
