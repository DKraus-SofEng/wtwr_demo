const { Joi, celebrate } = require("celebrate");
const validator = require("validator");
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// clothing card validator
module.exports.validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.uri": 'the "avatar" field must be a valid url',
    }),
  }),
});

// signup validator
module.exports.validateUsersBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    email: Joi.string().required().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email address',
    }),
    password: Joi.string().required().min(8).messages({
      "string.min": 'The minimum length of the "name" field is 8',
      "string.empty": 'The "password" field must be filled in',
    }),

    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.uri": 'the "avatar" field must be a valid url',
    }),
  }),
});

// login validator
module.exports.validateSigninBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email address',
    }),
    password: Joi.string().required().min(8).messages({
      "string.min": 'The minimum length of the "name" field is 8',
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

// user and item ID validator
module.exports.validateIdParam = celebrate({
  params: Joi.object()
    .keys({
      itemId: Joi.string().hex().length(24).required().messages({
        "string.hex": "ID must be a hexadecimal value",
        "string.length": "ID must be 24 characters long",
        "string.empty": "ID is required",
      }),
      userId: Joi.string().hex().length(24).required().messages({
        "string.hex": "ID must be a hexadecimal value",
        "string.length": "ID must be 24 characters long",
        "string.empty": "ID is required",
      }),
    })
    .unknown(true), // allows other params if needed
});

// update user validator
module.exports.validateUpdateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
    }),
    avatar: Joi.string().uri().messages({
      "string.uri": 'The "avatar" field must be a valid url',
    }),
  }),
});
