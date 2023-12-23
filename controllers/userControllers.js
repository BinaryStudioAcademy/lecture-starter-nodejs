import { decorator } from '../decorators/decorator.js';
import { userService } from '../services/userService.js';

// *********************************************************

const getAll = (req, res) => {
  res.data = userService.getAllUsers();
};

const getCurrent = (req, res) => {
  const { id } = req.params;
  res.data = userService.search({ id });
};

const create = (req, res) => {
  if (!res.error) res.data = userService.register(req.body);
};

const edit = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  res.data = userService.editUser(id, data);
};

const remove = (req, res) => {
  const { id } = req.params;
  res.data = userService.deleteUser(id);
};

// *********************************************************

export const userCtrl = {
  getAll: decorator(getAll),
  getCurrent: decorator(getCurrent),
  create: decorator(create),
  edit: decorator(edit),
  remove: decorator(remove),
};
