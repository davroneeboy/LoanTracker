export const validateUsername = (rule: any, value: string, callback: any) => {
  if (/^[A-Za-z0-9]+$/.test(value)) {
    callback();
  } else {
    callback("Username can only contain alphanumeric characters.");
  }
};

export const validateNumber = (rule: any, value: string, callback: any) => {
  if (!isNaN(Number(value))) {
    callback();
  } else {
    callback("Value must be a number.");
  }
};
