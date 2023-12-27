import { decorator } from '../decorators/decorator.js';
import { fightService } from '../services/fightService.js';

// *********************************************************

const getAll = (req, res) => {
  res.data = fightService.getAllFights();
};

const getCurrent = (req, res) => {
  const { id } = req.params;
  res.data = fightService.search({ id });
};

const save = (req, res) => {
  if (!res.error) res.data = fightService.save(req.body);
};

// *********************************************************

export const fightsCtrl = {
  getAll: decorator(getAll),
  getCurrent: decorator(getCurrent),
  save: decorator(save),
};
