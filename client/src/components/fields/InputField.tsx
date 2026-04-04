import React from 'react';
import { useController, type Control, type Path } from 'react-hook-form';

import { classNames } from '../../utils/classNames';
import { Typography } from '../Typography';

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
        <Typography className="text-sky-600">
          {label}
        </Typography>
        <div>
          <input
            className={classNames(
              'block',
              'mt-2',
              'typography-text-large',
              'text-sky-700',
              'bg-white',
              'rounded-md',
              'p-1',
              'outline-1',
              '-outline-offset-1 outline-sky-600',
              'focus:outline-2',
              'focus:-outline-offset-2',
              'focus:outline-sky-700'
            )}
            type="text"
            value={field.value || ''}
            disabled={field.disabled}
            name={field.name}
            onChange={field.onChange}
            onBlur={field.onBlur}
            ref={field.ref}
          />
        </div>
      </label>
      {fieldState.invalid && fieldState.error?.message && (
        <Typography
          className={classNames(
            'block',
            'text-rose-600'
          )}
          size="small"
        >
          {fieldState.error.message}
        </Typography>
      )}
    </div>
  );
};
