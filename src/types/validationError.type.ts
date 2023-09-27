interface ValidationError {
  loc: (number | string)[];
  msg: string;
  type: string;
}

export interface HTTPValidationError {
  detail: ValidationError;
}

export interface ApiValidationError {
  error: {
    detail: string;
  };
  statusCode: number;
}

export default ValidationError;
