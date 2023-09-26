interface ValidationError {
  loc: (number | string)[];
  msg: string;
  type: string;
}

export interface HTTPValidationError {
  detail: ValidationError | string;
}

export default ValidationError;
