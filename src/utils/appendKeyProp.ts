const appendKeyProp = <T>(list: T[] | null | undefined): (T & { key: string })[] => {
  if (!list || !Array.isArray(list)) {
    return [];
  }
  return list.map((item, index) => ({ ...item, key: `key_${index}` }));
};

export default appendKeyProp;
