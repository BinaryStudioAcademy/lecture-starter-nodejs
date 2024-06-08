/* 
When creating a fighter — all fields are required, except for id and health
When updating a user or a fighter — at least one field from the model must be present
Id in the request body should NOT be present


 */

const FIGHTER = {
  id: "",
  name: "", // unique +  case insensitive
  health: 85,
  power: 0,
  defense: 1, // 1 to 10
};

export { FIGHTER };
