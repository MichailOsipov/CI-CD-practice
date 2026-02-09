import { http } from '../services/httpService';

export const fetchLogoutUser = () => http.post('/oauth/logout');
