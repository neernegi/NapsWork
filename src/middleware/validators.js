import { body, validationResult, query } from "express-validator";

// Signup validations
export const signupValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

// Login validations
export const loginValidator = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

// Post creation validation
export const postCreateValidator = [
  body("postName").notEmpty().withMessage("postName is required"),
  body("description").notEmpty().withMessage("description is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

// Fetch posts validator (query params)
export const fetchPostsValidator = [
  query("startDate")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("startDate must be a valid date"),
  query("endDate")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("endDate must be a valid date"),
  query("page").optional().isInt({ min: 1 }).toInt(),
  query("limit").optional().isInt({ min: 1 }).toInt(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];
