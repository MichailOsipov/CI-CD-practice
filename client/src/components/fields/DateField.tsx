import React from 'react';
import { useController, type Control, type Path } from 'react-hook-form';

const getDateInputStr = (date?: Date) => {
  return date?.toISOString().split("T")[0] || '';
};

type DateFieldProps<
FormValues extends Record<string, any>,
> = {
  name: Path<FormValues>;
  label: string;
  control: Control<FormValues>;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  validate?: (value?: Date) => string | undefined;
};

export const DateField = <
FormValues extends Record<string, any>,
>({
  name,
  label,
  control,
  disabled,
  minDate,
  maxDate,
  validate,
}: DateFieldProps<FormValues>) => {
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
          type="date"
          value={getDateInputStr(field.value)}
          disabled={field.disabled}
          name={field.name}
          ref={field.ref}
          min={getDateInputStr(minDate)}
          max={getDateInputStr(maxDate)}
          onChange={e => field.onChange(new Date(e.target.value))}
          onBlur={field.onBlur}
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
