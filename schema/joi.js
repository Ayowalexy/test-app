import Joi from "joi";


const signUpSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    country: Joi.string().required(),
    state: Joi.string().required(),
    username: Joi.string().required()
})


const editUserSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string().required()
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

const deleteSchema = Joi.object({
    email: Joi.string().email().required(),
})

const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required()
})

const deleteProductSchema = Joi.object({
    name: Joi.string().required()
})

export {
    signUpSchema,
    loginSchema,
    deleteSchema,
    productSchema,
    deleteProductSchema,
    editUserSchema
}