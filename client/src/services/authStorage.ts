const STORAGE_KEY = 'authToken';

export const setAuthDataStorage = (token: string | null) => {
  if (token) {
    localStorage.setItem(STORAGE_KEY, token);
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
};

export const getAuthDataStorage = () => {
  const token = localStorage.getItem(STORAGE_KEY);

  if (!token) {
    return null;
  }

  return token;
};
