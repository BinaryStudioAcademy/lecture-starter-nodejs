const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  res.sendSuccess = (data) => {
    res.status(200).json({ error: false, data });
  };

  res.sendNotFound = () => {
    res.status(404).json({ error: true, message: 'Not found' });
  };

  res.sendBadRequest = (message) => {
    res.status(400).json({ error: true, message });
  };
  
  next();
};

export { responseMiddleware };
