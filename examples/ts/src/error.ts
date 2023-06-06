/* eslint-disable import/prefer-default-export */
export class CustomError extends Error {
  code: string;

  props: {
    persist: boolean;
    [prop: string]: $TSFixMe;
  };

  constructor(code: string, message: string, props = {}) {
    super(message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
    this.code = code;
    this.props = { persist: false, ...props };
  }
}
