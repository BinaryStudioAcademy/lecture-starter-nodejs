const responseMiddleware = (req, res) => {
  const errorObj = { error: true, message: '' };

  if (res.error) {
    errorObj.message = res.error;
    const is409 = res.error.includes('already exists');
    const code = is409 ? 409 : 400;
    return res.status(code).json(errorObj);
  }

  if (!res.data) {
    const parsedBaseUrl = res.req.baseUrl.split('/');
    const index = parsedBaseUrl.length - 1;
    const collection = parsedBaseUrl[index];

    const entity = collection === 'users' ? 'User' : 'Fighter';

    errorObj.message = `${entity} not found`;
    return res.status(404).json(errorObj);
  }

  return res.json(res.data); // '200 OK' is returned by default
};

export { responseMiddleware };
