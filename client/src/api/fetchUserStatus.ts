import { http } from '../services/httpService';

export enum UserStatus {
  UNKNOWN = 'UNKNOWN',
  NOT_REGISTERED = 'NOT_REGISTERED',
  REGISTERED = 'REGISTERED',
}

export type UserStatusResponse = {
  status: UserStatus;
};
 
export const fetchUserStatus = () => http.get<UserStatusResponse>('/private/client/status');
