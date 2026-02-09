import { http } from '../services/httpService';

export type ClientInfoResponse = {
  phoneNumber: string;
};

export const fetchClientInfo = () => http.get<ClientInfoResponse>('/private/client/info');