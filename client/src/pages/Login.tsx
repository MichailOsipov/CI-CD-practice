import React, { type FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getIsLoadingAuthorization, loginUserAction } from '../store/user';

export const Login = () => {
  const [login, setLogin] = useState('');

  const isLoadingAuthorization = useSelector(getIsLoadingAuthorization);
  
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginUserAction({ login }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={login}
        disabled={isLoadingAuthorization}
        onChange={e => setLogin(e.target.value)}
      />
      <button
        type="submit"
        disabled={isLoadingAuthorization}
      >
        Login
      </button>
    </form>
  );
};
