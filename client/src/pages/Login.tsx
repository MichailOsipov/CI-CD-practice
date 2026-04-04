import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../components/Button';
import { Typography } from '../components/Typography';
import {
  composeValidators,
  InputField,
  requiredValidator,
  textIncludesLettersAndDigitsOnlyValidator,
} from '../components/fields';
import { LayoutPage, LayoutSection } from '../components/layout';
import { getIsLoadingAuthorization, loginUserAction } from '../store/user';

const DEFAULT_LOGIN_FORM_VALUES = {
  login: '',
};

type LoginFormValues = {
  login: string;
};

export const Login = () => {
  const {
    control,
    handleSubmit,
  } = useForm<LoginFormValues>({
    mode: 'onBlur',
    defaultValues: DEFAULT_LOGIN_FORM_VALUES,
  });

  const isLoadingAuthorization = useSelector(getIsLoadingAuthorization);

  const loginValidator = useMemo(() => composeValidators(
    requiredValidator('Your login most not be empty'),
    textIncludesLettersAndDigitsOnlyValidator('Your login must include letters and digits only'),
  ), []);

  const dispatch = useDispatch();

  const onSubmit = ({ login }: LoginFormValues) => {
    dispatch(loginUserAction({ login }));
  };

  return (
    <LayoutPage>
      <LayoutSection>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography
            className="text-center text-sky-700"
            tag="h1"
            size="3xl"
          >
            Login
          </Typography>
          <InputField
            label="Your login:"
            name="login"
            control={control}
            validate={loginValidator}
          />
          <br />
          <Button
            type="submit"
            disabled={isLoadingAuthorization}
          >
            Login
          </Button>
        </form>
      </LayoutSection>
    </LayoutPage>
  );
};
