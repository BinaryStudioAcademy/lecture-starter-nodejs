// When updating a user or a fighter — at least one field from the model must be present
//Id in the request body should NOT be present

const USER = {
  id: "", //all fields are required, except for id
  firstName: "",
  lastName: "",
  email: "", //allow only @gmail domain + unique
  phoneNumber: "", //+380xxxxxxxxx + unique
  password: "", // min 3 symbols
};

export { USER };
