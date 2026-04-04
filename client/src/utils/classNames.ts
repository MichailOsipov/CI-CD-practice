export const classNames = (...args: (string | undefined)[]) => {
  return args.filter(x => x !== undefined && x !== '').join(' ');
};
