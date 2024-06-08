// we want to be able to set the http code error
export class CustomError extends Error {
  constructor(message, code) {
    super();
    this.message = message;
    this.code = code;
  }
}
