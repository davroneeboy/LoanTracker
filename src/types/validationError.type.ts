interface ValidationError {
  loc: (number | string)[];
  msg: string;
  type: string;
}

export interface HTTPValidationError {
  detail: ValidationError;
}

export default ValidationError;
