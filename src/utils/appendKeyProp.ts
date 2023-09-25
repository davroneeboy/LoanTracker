const appendKeyProp = <T>(list: T[]): (T & { key: string })[] =>
  list.map((item, index) => ({ ...item, key: `key_${index}` }));

export default appendKeyProp;
