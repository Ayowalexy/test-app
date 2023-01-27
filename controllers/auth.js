
import asyncHandler from 'express-async-handler'
import connection from '../db/db.js'
import { signUpSchema, loginSchema, deleteSchema, editUserSchema } from '../schema/joi.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

const { sign, verify } = jwt;




const createAccount = asyncHandler(async (req, res) => {

    const { error, value } = signUpSchema.validate(req.body);

    if (error) {
        return res
            .status(401)
            .json(
                {
                    status: "error",
                    message: "invalid request",
                    meta: {
                        error: error.message
                    }
                })
    }


    const hash = await bcrypt.hashSync(value.password, 12);

    delete value.password

    const data = { ...value, _password: hash }

    connection.query('INSERT INTO users SET ?', data, function (err, result) {
        if (err) {
            res
                .status(401)
                .json(
                    {
                        status: "error",
                        message: "invalid request",
                        meta: {
                            error: err.sqlMessage
                        }
                    })
        } else {
            res
                .status(201)
                .json(
                    {
                        status: "success",
                        message: "user created successfully",
                        data,
                        meta: {
                            error: ""
                        }
                    })
        }
    })
})

const loginUser = asyncHandler(async (req, res) => {

    const { error, value } = loginSchema.validate(req.body);

    if (error) {
        return res
            .status(401)
            .json(
                {
                    status: "error",
                    message: "invalid request",
                    meta: {
                        error: error.message
                    }
                })
    }

    connection.query(`SELECT * FROM users WHERE email='${value.email}'`, async function (err, result) {
        if (err) {
            console.log(err)
        } else {
            console.log('user', result)
            if (result.length) {
                const user = result[0];
                const match = await bcrypt.compareSync(value.password, user._password);

                if (match) {
                    const token = sign({ email: user.email, id: user._id.toString() }, process.env.SECRET)

                    res
                        .status(201)
                        .json(
                            {
                                status: "success",
                                message: "user fetched successfully",
                                data: result[0],
                                token: token,
                                meta: {}
                            })
                } else {
                    res
                        .status(401)
                        .json(
                            {
                                status: "error",
                                message: "invalid request",
                                meta: { error: "Email or password does not match" }
                            })
                }


            } else {
                res
                    .status(401)
                    .json(
                        {
                            status: "error",
                            message: "invalid request",
                            meta: { error: "Email does not exits" }
                        })
            }
        }
    })
})


const deleteUser = asyncHandler(async (req, res) => {
    const { error, value } = deleteSchema.validate(req.body);

    if (error) {
        return res
            .status(401)
            .json(
                {
                    status: "error",
                    message: "invalid request",
                    meta: {
                        error: error.message
                    }
                })
    }
    connection.query(`DELETE FROM users WHERE email='${value.email}'`, function (err, result) {
        if (err) {
            res
                .status(401)
                .json(
                    {
                        status: "error",
                        message: "invalid request",
                        meta: {
                            error: 'Error occured'
                        }
                    })
        } else {
            res
                .status(201)
                .json(
                    {
                        status: "success",
                        message: "user deleted",
                        meta: {}
                    })
        }
    })
})

const editUser = asyncHandler(async (req, res) => {
    const { error, value } = editUserSchema.validate(req.body);

    if (error) {
        return res
            .status(401)
            .json(
                {
                    status: "error",
                    message: "invalid request",
                    meta: {
                        error: error.message
                    }
                })
    }


    connection.query(`UPDATE users SET firstName='${value.firstName}', lastName='${value.lastName}', email='${value.email}', username='${value.username}' WHERE email='${value.email}'`,
        function (err, result) {
            if (err) {
                res
                    .status(401)
                    .json(
                        {
                            status: "error",
                            message: "invalid request",
                            meta: {
                                error: 'Error occured'
                            }
                        })
            } else {
                res
                    .status(201)
                    .json(
                        {
                            status: "success",
                            message: "user edit",
                            data: value,
                            meta: {}
                        })
            }
        }
    )
})

const getAllUsers = asyncHandler(async (req, res) => {
    connection.query('SELECT * FROM users', function (err, result) {
        if (err) {
            res
                .status(401)
                .json(
                    {
                        status: "error",
                        message: "invalid request",
                        meta: {
                            error: 'Error occured'
                        }
                    })
        } else {
            res
                .status(201)
                .json(
                    {
                        status: "success",
                        message: "user edit",
                        data: result,
                        meta: {}
                    })
        }
    })
})

export {
    createAccount,
    loginUser,
    deleteUser,
    editUser,
    getAllUsers
}