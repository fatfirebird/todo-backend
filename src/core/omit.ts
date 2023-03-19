type DefaultObject = {
  [key: string]: unknown;
};

export const omit = <T = DefaultObject>(fields: T, exclude: (keyof Partial<T>)[]) => {
  const newObj = { ...fields };

  exclude.forEach((key) => {
    delete newObj[key];
  });

  return newObj as Omit<T, keyof typeof exclude>;
};
