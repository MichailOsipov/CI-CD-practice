import React, { useMemo } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { InputField, requiredValidator } from '../components/fields';
import { DateField } from '../components/fields/DateField';
import { NumberField } from '../components/fields/NumberField';
import { SelectField } from '../components/fields/SelectField';
import { getIsLoadingSaveCheck, initSaveCheckAction } from '../store/lk';

const TODAY = new Date();

const getSumm = (values: number[]) => values.reduce((prev, curr) => prev + curr, 0);

enum IncomeType {
  LEGAL_ENTITY = 'LEGAL_ENTITY',
  INDIVIDUAL = 'INDIVIDUAL',
  FOREIGN_ENTITY = 'FOREIGN_ENTITY',
}

type IncomeTypeOption = {
  label: string;
  value: IncomeType;
};

type CheckValues = {
  operationDate?: Date;
  incomeType?: IncomeTypeOption;
  foreignOrganizationName?: string;
  legalCompanyName?: string;
  inn?: string;
  services: {
    name: string;
    value: string;
  }[];
};

const INCOME_TYPE_OPTIONS = [
  {
    label: 'Individual',
    value: IncomeType.INDIVIDUAL,
  },
  {
    label: 'Legal entity',
    value: IncomeType.LEGAL_ENTITY,
  },
  {
    label: 'Foreign organization',
    value: IncomeType.FOREIGN_ENTITY,
  }
];

export const NewCheck = () => {
  const dispatch = useDispatch();

  const isLoadingSaveCheckValues = useSelector(getIsLoadingSaveCheck);

  const {
    control,
    reset,
    handleSubmit,
  } = useForm<CheckValues>({
    mode: 'onBlur',
    defaultValues: {
      operationDate: undefined,
      services: [
        {
          name: '',
          value: '',
        }
      ],
    },
  });

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'services',
  });

  const incomeTypeValue: IncomeTypeOption | undefined = useWatch({
    control,
    name: 'incomeType',
  });

  const servicesValues = useWatch({
    control,
    name: 'services',
  });

  const operationDateValidator = useMemo(() => requiredValidator('Operation date is required'), []);
  const incomeTypeValidator = useMemo(() => requiredValidator('Income type is required'), []);
  const innValidator = useMemo(() => requiredValidator('Inn is required'), []);
  const companyNameValidator = useMemo(() => requiredValidator('Company name is required'), []);
  const serviceNameValidator = useMemo(() => requiredValidator('Service name is required'), []);
  const serviceValueValidator = useMemo(() => requiredValidator('Service value is required'), []);

  const onSubmit = (values: CheckValues) => {
    dispatch(initSaveCheckAction({
      values,
      onCompleteSave: () => {
        reset();
      } 
    }));
  };

  return (
    <div>
      <h1>New check</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DateField
          name="operationDate"
          label="Operation date:"
          control={control}
          maxDate={TODAY}
          validate={operationDateValidator}
        />
        <SelectField
          name="incomeType"
          label="Income type:"
          control={control}
          options={INCOME_TYPE_OPTIONS}
          validate={incomeTypeValidator}
        />
        {incomeTypeValue?.value === IncomeType.LEGAL_ENTITY && (
          <div>
            <InputField
              name="legalCompanyName"
              label="Company name:"
              control={control}
              validate={companyNameValidator}
            />
            <InputField
              name="inn"
              label="Inn:"
              control={control}
              validate={innValidator}
            />
          </div>
        )}
        {incomeTypeValue?.value === IncomeType.FOREIGN_ENTITY && (
          <div>
            <InputField
              name="foreignOrganizationName"
              label="Company name:"
              control={control}
              validate={companyNameValidator}
            />
          </div>
        )}
        <h2>Services:</h2>
        {fields.map((field, index) => (
          <div key={field.name}>
            <InputField
              name={`services.${index}.name`}
              label="Service name:"
              control={control}
              validate={serviceNameValidator}
            />
            <NumberField
              name={`services.${index}.value`}
              label="Service value:"
              control={control}
              validate={serviceValueValidator}
            />
            {fields.length > 1 && (
              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => append({ name: '', value: '' })}>
          Add service
        </button>
        <div>
          Total price: {getSumm(servicesValues.map(field => Number(field.value)))}
        </div>
        {isLoadingSaveCheckValues ? (
          <div>Saving...</div>
        ) : (
          <button type="submit">
            Create Check
          </button>
        )}
      </form>
    </div>
  );
};
