import { http } from '../../services/httpService';

export type SendSmsCodeResponse = {
  nextRequestTimeInSeconds: number;
};

export const fetchSendSmsCode = () => http.post<SendSmsCodeResponse>('/private/send-sms-code');
