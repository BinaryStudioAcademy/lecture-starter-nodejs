const responseMiddleware = (req, res, next) => {
  // Middleware to standardize API responses

  // Function for success (status 200)
  res.success = (data) => {
    res.status(200).json(data);
  };

  // Function for bad request error (status 400)
  res.badRequest = (message) => {
    res.status(400).json({
      error: true,
      message: message || "Bad Request",
    });
  };

  // Function for not found error (status 404)
  res.notFound = (message) => {
    res.status(404).json({
      error: true,
      message: message || "Resource not found",
    });
  };

  // Function for internal server error (status 500) - optional, but good to have
  res.internalError = (message) => {
    res.status(500).json({
      error: true,
      message: message || "Internal Server Error",
    });
  };
  
  next();
};

export { responseMiddleware };
