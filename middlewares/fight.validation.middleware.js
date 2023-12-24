import { FIGHT } from '../models/fight.js';
import { errorMessages } from '../constants/errorMessages.js';
import { fightService } from '../services/fightService.js';

// *********************************************************

const fightKeys = Object.keys(FIGHT);
const fightSchema = [...fightKeys];
const indexOfId = fightSchema.indexOf('id');
fightSchema.splice(indexOfId, 1);

// *********************************************************

// New fight validation
export const saveFightValid = (req, res, next) => {
  //

  const bodyKeys = Object.keys(req.body);

  // Body is empty
  if (!bodyKeys.length) {
    res.error = errorMessages.emptyBody;
    next();
  }

  // Some required fields are missing, or extra fields have been detected
  const matches = bodyKeys.every((bodyKey) =>
    fightSchema.find((fighterKey) => fighterKey === bodyKey)
  );

  if (!matches) {
    res.error = errorMessages.fight.invalidFightData;
    next();
  }

  next();
};
