
type ValidatorFunc<Value, AllValues> = (value: Value, allValues?: AllValues) => string | undefined;

export const composeValidators = <Value, AllValues>(
  ...validators: ValidatorFunc<Value, AllValues>[]
): ValidatorFunc<Value, AllValues> =>
  (...validatorArgs) => {
    for (let i = 0; i < validators.length; i += 1) {
      const validator = validators[i];

      const errorMessage = validator(...validatorArgs);

      if (errorMessage) {
        return errorMessage;
      }
    }

    return undefined;
};
