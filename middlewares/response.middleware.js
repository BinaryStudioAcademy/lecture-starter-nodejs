const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  console.log('Request received');
  if (!res.locals.data) return next(new Error("No data found in locals"));
  else {
    let statusCode = res.statusCode || 200;
    res.jsonp({
      status: 'success',
      statusCode,
      message: null,
      data: res.locals.data
      });
  }
  next();
};

export { responseMiddleware };
