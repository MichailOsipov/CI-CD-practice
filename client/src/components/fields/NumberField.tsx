import React from 'react';
import { useController, type Control, type Path } from 'react-hook-form';

type NumberFieldProps<
  FormValues extends Record<string, any>,
> = {
  name: Path<FormValues>;
  label: string;
  control: Control<FormValues>;
  disabled?: boolean;
  validate?: (value?: number) => string | undefined;
};

export const NumberField = <
FormValues extends Record<string, any>,
>({
  name,
  label,
  control,
  disabled,
  validate,
}: NumberFieldProps<FormValues>) => {
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
          type="number"
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
