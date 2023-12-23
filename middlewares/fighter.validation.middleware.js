import { FIGHTER } from '../models/fighter.js';
import { errorMessages } from '../constants/errorMessages.js';
import { fighterService } from '../services/fighterService.js';

// *********************************************************

const fighterKeys = Object.keys(FIGHTER);
const indexOfId = fighterKeys.indexOf('id');
const indexOfHealth = fighterKeys.indexOf('health');

const fighterSchema = [...fighterKeys];
fighterSchema.splice(indexOfId, 1);
fighterSchema.splice(indexOfHealth, 1);

// *********************************************************

// New fighter validation
const createFighterValid = (req, res, next) => {
  //

  const bodyKeys = Object.keys(req.body);

  // Body is empty
  if (!bodyKeys.length) {
    res.error = errorMessages.emptyBody;
    next();
  }

  // Some required fields are missing, or extra fields have been detected
  const matches = bodyKeys.every(
    (bodyKey) =>
      fighterSchema.find((fighterKey) => fighterKey === bodyKey) ||
      bodyKey === 'health'
  );

  if (!matches) {
    res.error = errorMessages.fighter.invalidFighterData;
    next();
  }

  const { name, health, power, defense } = req.body;

  // Fighter name already exists
  const doesNameExist = fighterService.search({ name });

  if (doesNameExist) {
    res.error = errorMessages.fighter.fighterExists;
    next();
  }

  const isPowerInvalid = Number.isNaN(power) || !(1 <= power <= 100);
  const isDefenseInvalid = Number.isNaN(defense) || !(1 <= defense <= 10);
  const isHealthInvalid = Number.isNaN(health) || !(80 <= health <= 120);

  // Invalid power value
  if (isPowerInvalid) {
    res.error = errorMessages.fighter.invalidPower;
    next();
  }

  // Invalid defense value
  if (isDefenseInvalid) {
    res.error = errorMessages.fighter.invalidDefense;
    next();
  }

  // Invalid health value
  if (health && isHealthInvalid) {
    res.error = errorMessages.fighter.invalidHealth;
    next();
  }

  next();
};

// *********************************************************

// Update fighter validation

const updateFighterValid = (req, res, next) => {
  const bodyKeys = Object.keys(req.body);

  // Body is empty
  if (!bodyKeys.length) {
    res.error = errorMessages.emptyBody;
    next();
  }

  // Not any field matches fighter schema
  const matches = bodyKeys.some(
    (bodyKey) =>
      fighterSchema.find((fighterKey) => fighterKey === bodyKey) ||
      bodyKey === 'health'
  );

  if (!matches) {
    res.error = errorMessages.fighter.invalidFighterData;
    next();
  }

  const { name, health, power, defense } = req.body;

  // Fighter name already exists
  const nameExists = fighterService.search({ name });

  if (name && nameExists) {
    res.error = errorMessages.fighter.fighterExists;
    next();
  }

  const isPowerInvalid = Number.isNaN(power) || !(1 <= power <= 100);
  const isDefenseInvalid = Number.isNaN(defense) || !(1 <= defense <= 10);
  const isHealthInvalid = Number.isNaN(health) || !(80 <= health <= 120);

  // Invalid power value
  if (power && isPowerInvalid) {
    res.error = errorMessages.fighter.invalidPower;
    next();
  }

  // Invalid defense value
  if (defense && isDefenseInvalid) {
    res.error = errorMessages.fighter.invalidDefense;
    next();
  }

  // Invalid health value
  if (health && isHealthInvalid) {
    res.error = errorMessages.fighter.invalidHealth;
    next();
  }

  next();
};

export { createFighterValid, updateFighterValid };
