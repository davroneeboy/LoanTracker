const fetcher = async (arg: any, ...args: any) => {
  const res = await fetch(arg, ...args);
  const data = await res.json();
  
  // Если ответ содержит ошибку, выбрасываем её
  if (data?.error) {
    throw new Error(data.error.detail || JSON.stringify(data.error));
  }
  
  return data;
};

export default fetcher;
