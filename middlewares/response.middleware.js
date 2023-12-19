import { errorMessages } from '../constants/errorMessages.js';

const responseMiddleware = (_, res, next) => {
  const errorObj = { error: true, message: '' };

  // Помилки запиту (валідація, проблеми в обробці) — повернути статус 400 та JSON з помилкою
  if (res.error) {
    console.log('res.error: ', res.error);
    errorObj.message = res.error.message || errorMessages.registrationError;
    return res.status(400).json(errorObj);
  }

  if (!res.data) {
    errorObj.message = errorMessages.userNotFound;
    return res.status(404).json(errorObj);
  }

  return res.json(res.data); // '200 OK' is returned by default
};

export { responseMiddleware };
