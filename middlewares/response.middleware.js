const response404 = (req, res, next) => {
  if (res?.isError404) {
    res.status(404).json({ error: true, message: res.message });
  } else {
    next();
  }
};

const response400 = (req, res, next) => {
  if (res?.isError400) {
    res.status(400).json({ error: true, message: res.message });
  } else {
    next();
  }
};

const response422 = (req, res, next) => {
  if (res?.isError422) {
    res.status(422).json({ error: true, message: res.message });
  } else {
    next();
  }
};

const responseMiddleware = [
  response404,
  response400,
  response422,
  (req, res, next) => {
    res.status(200).json(res.data);
    next();
  },
];

export { responseMiddleware };
