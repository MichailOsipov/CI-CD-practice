import { http } from '../services/httpService';

export enum IncomeType {
  LEGAL_ENTITY = 'LEGAL_ENTITY',
  INDIVIDUAL = 'INDIVIDUAL',
  FOREIGN_ENTITY = 'FOREIGN_ENTITY',
}

export type IncomeTypeOption = {
  label: string;
  value: IncomeType;
};

export type CheckValues = {
  operationDate?: Date;
  incomeType?: IncomeTypeOption;
  foreignOrganizationName?: string;
  legalCompanyName?: string;
  inn?: string;
  services: {
    name: string;
    value: string;
  }[];
}

export const fetchSaveCheck = (checkValues: CheckValues) => http.post('/private/check', { checkValues });
