import React, { type ChangeEvent } from 'react';
import { useController, type Control, type Path } from 'react-hook-form';

type SelectFieldProps<
FormValues extends Record<string, any>,
Option extends { label: string; value: string; },
> = {
  name: Path<FormValues>;
  label: string;
  control: Control<FormValues>;
  options: Option[];
  disabled?: boolean;
  validate?: (value: Option) => string | undefined;
};

export const SelectField = <
  FormValues extends Record<string, any>,
  Option extends { label: string; value: string; },
>({
  name,
  label,
  control,
  options,
  disabled,
  validate,
}: SelectFieldProps<FormValues, Option>) => {
  const {
    field,
    fieldState,
  } = useController({
    name,
    control,
    disabled,
    rules: {
      validate,
    }
  });

  const selectedOption: Option | undefined = field.value;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSelectedOption = options.find(
      option => option.value === e.target.value,
    );

    field.onChange(newSelectedOption);
  };

  return (
    <div>
      <label htmlFor={name}>
        {label}
        <select
          value={selectedOption?.value || ''}
          disabled={field.disabled}
          ref={field.ref}
          onChange={handleChange}
          onBlur={field.onBlur}
        >
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <option value="" />
          {options.map(option => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </label>
      {fieldState.invalid && fieldState.error?.message && (
        <div>
          {fieldState.error.message}
        </div>
      )}
    </div>
  );
};
