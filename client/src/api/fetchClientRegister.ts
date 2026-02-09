import { http } from '../services/httpService';

export const fetchClientRegister = (activity: string, region: string, inn: string) =>
  http.post('/private/register', { activity, region, inn });
