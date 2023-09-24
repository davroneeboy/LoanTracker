const fetcher = (arg: any, ...args: any) =>
  fetch(arg, ...args).then((res) => res.json());

export const glAPI = `https://gl-interview.azurewebsites.net`;

export default fetcher;
