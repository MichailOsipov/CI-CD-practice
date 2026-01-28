import { http } from '../../services/httpService';

export type Activity = {
  name: string;
  label: string;
  groupName: string;
  groupLabel: string;
};

export const fetchActivities = () => http.get<{ items: Activity[] }>('/private/dictionary/activities');
