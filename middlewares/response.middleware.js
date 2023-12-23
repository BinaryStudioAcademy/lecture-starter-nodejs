export const responseMiddleware = (req, res) => {
  const errorObj = { error: true, message: '' };

  if (res.error) {
    errorObj.message = res.error.toString();
    const statusCode = errorObj.message.includes('already exists') ? 409 : 400;
    return res.status(statusCode).json(errorObj);
  }

  if (!res.data) {
    const parsedBaseUrl = res.req.baseUrl.split('/');
    const index = parsedBaseUrl.length - 1;
    const collection = parsedBaseUrl[index];

    const entity = collection === 'users' ? 'User' : 'Fighter'; // TODO: make more future-proof

    errorObj.message = `${entity} not found`;
    return res.status(404).json(errorObj);
  }

  return res.json(res.data); // '200 OK' is returned by default
};
