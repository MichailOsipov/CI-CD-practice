import { http } from '../services/httpService';

export const fetchLoginUser = (login: string) => http.post<{ token: string }>(
  '/oauth/token',
  { login },
);
