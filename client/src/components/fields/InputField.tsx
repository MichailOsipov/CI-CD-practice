import React from 'react';
import { useController, type Control, type Path } from 'react-hook-form';

type Value = string;

type InputFieldProps<FormValues extends Record<string, any>> = {
  name: Path<FormValues>;
  label: string;
  control: Control<FormValues>;
  disabled?: boolean;
  validate?: (value?: Value) => string | undefined;
};

export const InputField = <FormValues extends Record<string, any>,>({
  name,
  label,
  control,
  disabled,
  validate,
}: InputFieldProps<FormValues>) => {
  const {
    field,
    fieldState,
  } = useController({
    name,
    control,
    disabled,
    rules: {
      validate,
    },
  });

  return (
    <div>
      <label htmlFor={name}>
        {label}
        <input
          type="text"
          value={field.value || ''}
          disabled={field.disabled}
          name={field.name}
          onChange={field.onChange}
          onBlur={field.onBlur}
          ref={field.ref}
        />
      </label>
      {fieldState.invalid && fieldState.error?.message && (
        <div>
          {fieldState.error.message}
        </div>
      )}
    </div>
  );
};
