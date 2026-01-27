export const validateUsername = (rule: any, value: string, callback: any) => {
  if (/^[A-Za-z0-9]+$/.test(value)) {
    callback();
  } else {
    callback("Имя пользователя может содержать только буквы и цифры.");
  }
};

export const validateNumber = (rule: any, value: string, callback: any) => {
  if (!isNaN(Number(value))) {
    callback();
  } else {
    callback("Значение должно быть числом.");
  }
};
