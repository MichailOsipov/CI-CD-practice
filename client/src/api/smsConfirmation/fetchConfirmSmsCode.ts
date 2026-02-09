import { http } from '../../services/httpService';

export enum ConfirmSmsCodeStatus {
  VALID = 'VALID',
  INVALID = 'INVALID',
}

export type ConfirmSmsCodeResponse = {
  confirmSmsCodeStatus: ConfirmSmsCodeStatus;
};

export const fetchConfirmSmsCode = (smsCode: string) => http.post<ConfirmSmsCodeResponse>('/private/confirm-sms-code', { smsCode });
