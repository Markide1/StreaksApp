import Joi from 'joi';

export const updateProfileSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).allow(''),
  email: Joi.string().email().allow(''),
  password: Joi.string().min(6).allow('')
}).min(1);

export const uploadPhotoSchema = Joi.object({});