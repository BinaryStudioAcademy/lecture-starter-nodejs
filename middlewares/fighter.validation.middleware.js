import { FIGHTER } from "../models/fighter.js";
import { fighterService } from "../services/fighterService.js";

const createFighterValid = async (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during creation
  const { name } = req.body;

  try {
    const fighter = await fighterService.getOneFighter({ name });

    if (fighter) {
      throw new Error(`Fighter with name '${name}' already exists.`);
    }

    const requiredFields = ["name", "power", "defense"];
    checkRequiredFields(req.body, requiredFields);
    checkValidKeys(req.body, Object.keys(FIGHTER));
    isValid(req.body);

    req.validatedData = { ...req.body };
    next();
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const updateFighterValid = async (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update
  const { id } = req.params;

  try {
    const fighter = await fighterService.getOneFighter({ id });

    if (!fighter) {
      return res.status(404).send({ error: `Fighter with id '${id}' was not found.` });
    }

    if (!Object.keys(req.body).length) {
      throw new Error("No fields to update.");
    }

    if (req.body.name) {
      const existing = await fighterService.getOneFighter({ name: req.body.name });
      if (existing && existing.id !== id) {
        throw new Error(`Fighter with name '${req.body.name}' already exists.`);
      }
    }

    checkValidKeys(req.body, Object.keys(FIGHTER));
    isValid(req.body);

    req.validatedData = { ...req.body };
    next();
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const checkRequiredFields = (body, requiredFields) => {
  requiredFields.forEach(field => {
    if (body[field] === undefined || body[field] === null || body[field] === "") {
      throw new Error(`Field '${field}' is required and cannot be empty.`);
    }
  });
};

const checkValidKeys = (body, validKeys) => {
  Object.keys(body).forEach(key => {
    if (!validKeys.includes(key)) {
      throw new Error(`Invalid field '${key}' provided.`);
    }
  });
};

const isValid = (body) => {
  if (body.name) {
    validateName(body.name);
  }
  if (body.power !== undefined) {
    validatePower(body.power);
  }
  if (body.defense !== undefined) {
    validateDefense(body.defense);
  }
};

const validateName = (name) => {
  if (!/^[a-zA-Z]+$/.test(name)) {
    throw new Error("Invalid fighter name. Only letters allowed.");
  }
};

const validatePower = (power) => {
  const num = Number(power);
  if (isNaN(num) || num < 0 || num > 100) {
    throw new Error("Power must be a number in the range 0 - 100.");
  }
};

const validateDefense = (defense) => {
  const num = Number(defense);
  if (isNaN(num) || num < 1 || num > 10) {
    throw new Error("Defense must be a number in the range 1 - 10.");
  }
};

export { createFighterValid, updateFighterValid };
