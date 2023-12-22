import { userService } from '../services/userService.js';

const getAll = (req, res, next) => {
  res.data = userService.getAllUsers();
  next();
};

const getCurrent = (req, res, next) => {
  const { id } = req.params;
  res.data = userService.search({ id });
  next();
};

const create = (req, res, next) => {
  if (!res.error) res.data = userService.register(req.body);

  next();
};

const edit = (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  res.data = userService.editUser(id, data);
  next();
};

const remove = (req, res, next) => {
  const { id } = req.params;
  const result = userService.deleteUser(id);
  res.data = result;
  next();
};

export const controllers = {
  getAll,
  getCurrent,
  create,
  edit,
  remove,
};
