// User
const invalidData = 'Invalid user data';
const invalidEmail =
  'This is not a valid email. You need to register using a gmail email account';
const invalidPhone =
  'Telephone number must match the following format: +380xxxxxxxxx';
const invalidPass = 'Password must be at least 3 characters long';
const userNotFound = 'User not found';
const userExists = 'User already exists';

// Fighter
const invalidFighterData = 'Invalid user data';
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
