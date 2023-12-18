import { USER } from "../models/user.js";

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation
  const userData = req.body;
  if (!USER.isValid(userData)) {
    return res.status(400).send({ error: "Invalid User Data" });
  }
  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  const id = req.params.id;
  const data = req.body;
  if (!data || !Object.keys(data).length) {
    return res.status(400).json({ error: "No fields provided to update" });
    } else if (!USER.hasId(id)) {
      return res.status(400).json({ error: `User with ID ${id} not found`});
  }
  next();
};

export { createUserValid, updateUserValid };
