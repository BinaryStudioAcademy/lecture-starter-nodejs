const loggerMiddleware = (req, res, next) => {
  const now = new Date().toLocaleDateString();
  const logMessage = `${now}: ${req.method} ${
    req.url
  } - body params ${JSON.stringify(req.body)}`;
  console.log(logMessage);
  return next();
};

export { loggerMiddleware };
