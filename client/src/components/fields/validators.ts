type Value = string | number | Date | boolean | object | undefined | null;

export const requiredValidator = (message: string) => (value: Value) => {
    if (
      value === '' ||
      value === undefined ||
      value === false ||
      value === null
    ) {
      return message;
    }

    return undefined;
  };

export const textIncludesLettersAndDigitsOnlyValidator = (message: string) => (value: Value) => {
  if (requiredValidator('')(value)) {
    return undefined;
  }

  const valueStr = String(value);

  if (/^[a-zA-Z0-9_.-]*$/.test(valueStr)) {
    return undefined;
  }

  return message;
};
