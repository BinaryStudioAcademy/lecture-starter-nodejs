import { authService } from '../services/authService.js';
import { decorator } from '../decorators/decorator.js';

// *********************************************************

const login = (req, res) => {
  const { email, password } = req.body;
  const data = authService.login({ email, password });
  res.data = data;
};

// *********************************************************

export const authCtrl = {
  login: decorator(login),
};
