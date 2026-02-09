import { http } from '../services/httpService';

export type ClientFindResponse = {
  inn: string;
};

export const fetchClientFind = () => http.get<ClientFindResponse>('/private/client/find');