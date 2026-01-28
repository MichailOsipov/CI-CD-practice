import { http } from '../../services/httpService';

export type Region = {
  oktmo: string;
  name: string;
};

export const fetchRegions = () => http.get<{ items: Region[] }>('/private/dictionary/regions');
