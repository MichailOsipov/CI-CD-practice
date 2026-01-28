import { http } from '../services/httpService';

export type VerificationStatus = 'UNKNOWN' | 'ALLOW' | 'DENY';
export type ClientVerificationResponse = {
  verificationStatus: VerificationStatus;
};

export const fetchClientVerification = () => http.get<ClientVerificationResponse>('/private/client/verification');
