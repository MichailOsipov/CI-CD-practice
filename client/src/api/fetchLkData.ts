import { http } from '../services/httpService';

export type LkDataResponse = {
  income: number;
  taxes: number;
};

export const fetchLkData = () => http.get<LkDataResponse>('/private/lk-data');
