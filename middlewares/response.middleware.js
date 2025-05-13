const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  if (res.data !== undefined) {
    return res.status(200).json(res.data);
  }

  if (res.err !== undefined) {
    const { message } = res.err;
    return res.status(res.err.status || 400).json({
      error: true,
      message,
    });
  }
  next();
};

export { responseMiddleware };
