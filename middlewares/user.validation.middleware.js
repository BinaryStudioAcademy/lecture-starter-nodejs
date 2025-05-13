import { USER } from "../models/user.js";
import { userService } from "../services/userService.js";

const isGmail = (email) => /^[^\s@]+@gmail\.com$/.test(email);
const isPhone = (phone) => /^\+380\d{9}$/.test(phone);
const isPassword = (password) => typeof password === 'string' && password.length >= 4;



const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation
  const user = req.body;

  // Disallow 'id'
  if ("id" in user) {
    return res.status(400).json({ error: true, message: "Field 'id' is not allowed" });
  }

  const requiredFields = Object.keys(USER).filter((key) => key !== "id");
  const missingFields = requiredFields.filter((field) => !user[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: true,
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  // Extra fields not in model
  const modelFields = Object.keys(USER);
  const extraFields = Object.keys(user).filter((key) => !modelFields.includes(key));
  if (extraFields.length > 0) {
    return res.status(400).json({
      error: true,
      message: `Extra fields are not allowed: ${extraFields.join(", ")}`,
    });
  }

  // Field format validations
  if (!isGmail(user.email)) {
    return res.status(400).json({ error: true, message: "Email must be a @gmail.com address" });
  }

  if (!isPhone(user.phone)) {
    return res.status(400).json({ error: true, message: "Phone must match format +380xxxxxxxxx" });
  }

  if (typeof user.password !== "string" || user.password.length < 4) {
    return res.status(400).json({ error: true, message: "Password must be at least 4 characters" });
  }

  // Uniqueness checks (case-insensitive)
  const existingEmail = userService.search({ email: user.email.toLowerCase() });
  if (existingEmail) {
    return res.status(400).json({ error: true, message: "User with this email already exists" });
  }

  const existingPhone = userService.search({ phone: user.phone });
  if (existingPhone) {
    return res.status(400).json({ error: true, message: "User with this phone already exists" });
  }

  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  const user = req.body;

  // Disallow 'id'
  if ("id" in user) {
    return res.status(400).json({ error: true, message: "Field 'id' is not allowed" });
  }

  const allowedFields = Object.keys(USER).filter((key) => key !== "id");
  const keys = Object.keys(user);

  // Must contain at least one valid field
  const validUpdateFields = keys.filter((key) => allowedFields.includes(key));
  if (validUpdateFields.length === 0) {
    return res.status(400).json({
      error: true,
      message: "At least one valid field must be provided to update",
    });
  }

  // Check for extra fields
  const extraFields = keys.filter((key) => !allowedFields.includes(key));
  if (extraFields.length > 0) {
    return res.status(400).json({
      error: true,
      message: `Extra fields are not allowed: ${extraFields.join(", ")}`,
    });
  }

  // Optional: Field-level format checks
  if (user.email && !isGmail(user.email)) {
    return res.status(400).json({ error: true, message: "Email must be a @gmail.com address" });
  }

  if (user.phone && !isPhone(user.phone)) {
    return res.status(400).json({ error: true, message: "Phone must match format +380xxxxxxxxx" });
  }

  if (user.password && (typeof user.password !== "string" || user.password.length < 4)) {
    return res.status(400).json({ error: true, message: "Password must be at least 4 characters" });
  }

  next();
};

export { createUserValid, updateUserValid };
