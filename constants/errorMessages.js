// User
const invalidData = 'Invalid user data';
const invalidEmail =
  'Invalid email format. Only @gmail.com domain is allowed';
const invalidPhone =
  'Invalid phone number format. Only +380XXXXXXXXX is allowed';
const invalidPass = 'Password should be a string with length of at least 3';
const userNotFound = 'User not found';
const userExists = 'User already exists';
const atLeastOneField = 'At least one field should be present';

// Fighter
const invalidFighterData = 'Invalid fighter data';
const invalidPower = 'Power must be a number from 1 to 100';
const invalidDefense = 'Defense must be a number from 1 to 10';
const invalidHealth = 'Health must be a number from 80 to 120 (default - 100)';
const fighterNotFound = 'Fighter not found';
const fighterExists = 'A fighter with this name already exists';

// Exports
export const errorMessages = {
  emptyBody: 'Request body is empty',

  user: {
    invalidData,
    invalidEmail,
    invalidPhone,
    invalidPass,
    userNotFound,
    userExists,
    atLeastOneField,
  },

  fighter: {
    invalidFighterData,
    invalidPower,
    invalidDefense,
    invalidHealth,
    fighterNotFound,
    fighterExists,
  },
};
