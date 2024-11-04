const Joi = require("joi");
const registrationSchema = Joi.object({
  firstName: Joi.string().required(),
  middleName: Joi.string(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  confirmPassword: Joi.ref("password"),
  phoneNumber: Joi.string().min(10).max(10).required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  zipCode: Joi.string().min(5).max(5).required(),
  dateOfBirth: Joi.date().required(),
  gender: Joi.string().valid("Male", "Female", "Other").required(),
  occupation: Joi.string().required(),
  isVolunteer: Joi.boolean().required(),
  organizazationName: Joi.string(),
  organizationDescription: Joi.string(),
});
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
