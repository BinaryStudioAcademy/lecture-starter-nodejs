import { decorator } from '../helpers/decorator.js';
import { fighterService } from '../services/fighterService.js';

// *********************************************************

const getAll = (req, res) => {
  res.data = fighterService.getAllFighters();
};

const getCurrent = (req, res) => {
  const { id } = req.params;
  res.data = fighterService.search({ id });
};

const create = (req, res) => {
  if (!res.error) res.data = fighterService.createFighter(req.body);
};

const edit = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  res.data = fighterService.editFighter(id, data);
};

const remove = (req, res) => {
  const { id } = req.params;
  res.data = fighterService.deleteFighter(id);
};
// *********************************************************

export const fighterCtrl = {
  getAll: decorator(getAll),
  getCurrent: decorator(getCurrent),
  create: decorator(create),
  edit: decorator(edit),
  remove: decorator(remove),
};
