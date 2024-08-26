import Joi from 'joi';

export const updateProfileSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email(),
  password: Joi.string().min(6)
}).min(1);

export const uploadPhotoSchema = Joi.object({
  photo: Joi.any().required()
});
