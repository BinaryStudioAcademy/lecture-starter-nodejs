const loggerMiddleware = (req, res, next) => {
  const now = new Date().toLocaleDateString();
  const logMessage = `${now}: ${req.method} ${req.url}`;
  console.log(logMessage);
};

export { loggerMiddleware };
