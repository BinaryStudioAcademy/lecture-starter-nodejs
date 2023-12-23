export const decorator = (controllerFunc) => {
  return (req, res, next) => {
    try {
      controllerFunc(req, res);
    } catch (error) {
      res.error = error;
    } finally {
      next();
    }
  };
};
