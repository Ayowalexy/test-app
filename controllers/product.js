import asyncHandler from 'express-async-handler'
import connection from '../db/db.js'
import { productSchema, deleteProductSchema } from '../schema/joi.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()


const addProduct = asyncHandler(async (req, res) => {

    const { error, value } = productSchema.validate(req.body);

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

    connection.query('INSERT INTO products SET ?', value, function (err, result) {
        if (err) {
            res
                .status(401)
                .json(
                    {
                        status: "error",
                        message: "invalid request",
                        meta: {
                            error: "Error occured"
                        }
                    })
        } else {
            res
                .status(201)
                .json(
                    {
                        status: "successs",
                        message: "Products added successfully",
                        data: value,
                        meta: {}
                    })
        }
    })

})


const deleteProduct = asyncHandler(async (req, res) => {

    const { error, value } = deleteProductSchema.validate(req.body);

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

    connection.query(`DELETE FROM products WHERE name='${value.name}'`, function (err, result) {
        if (err) {
            res
                .status(401)
                .json(
                    {
                        status: "error",
                        message: "invalid request",
                        meta: {
                            error: "Error occured"
                        }
                    })
        } else {
            res
                .status(201)
                .json(
                    {
                        status: "successs",
                        message: "Products deleted successfully",
                        meta: {}
                    })
        }
    })
})


const editProduct = asyncHandler(async (req, res) => {

    const { error, value } = productSchema.validate(req.body);

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

    connection.query(`UPDATE products SET name='${value.name}', price='${value.price}', category='${value.category}', description='${value.description}' WHERE name='${value.name}'`,
        function (err, result) {
            if (err) {
                console.log(err)
                res
                    .status(401)
                    .json(
                        {
                            status: "error",
                            message: "invalid request",
                            meta: {
                                error: "Error occured"
                            }
                        })
            } else {
                console.log(result)
                res
                    .status(201)
                    .json(
                        {
                            status: "successs",
                            message: "Products edited successfully",
                            data: value,
                            meta: {}
                        })
            }
        }
    )

})


const getOneProduct = asyncHandler(async (req, res) => {

    const { error, value } = deleteProductSchema.validate(req.body);

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

    connection.query(`SELECT * FROM products WHERE name='${value.name}'`, function (err, result) {
        if (err) {
            console.log(err)
            res
                .status(401)
                .json(
                    {
                        status: "error",
                        message: "invalid request",
                        meta: {
                            error: "Error occured"
                        }
                    })
        } else {
            console.log(result)
            if (result.length) {
                res
                    .status(201)
                    .json(
                        {
                            status: "successs",
                            message: "Products edited successfully",
                            data: result[0],
                            meta: {}
                        })
            } else {
                res
                    .status(201)
                    .json(
                        {
                            status: "successs",
                            message: "Products edited successfully",
                            data: {},
                            meta: {}
                        })
            }
        }
    })
})


const getAllProducts = asyncHandler(async (req, res) => {
    connection.query(`SELECT * FROM products`, function (err, result) {
        if (err) {
            res
                .status(401)
                .json(
                    {
                        status: "error",
                        message: "invalid request",
                        meta: {
                            error: "Error occured"
                        }
                    })
        } else {
            res
                .status(201)
                .json(
                    {
                        status: "successs",
                        message: "All Products",
                        data: result,
                        meta: {}
                    })
        }
    })
})

export {
    addProduct,
    deleteProduct,
    editProduct,
    getOneProduct,
    getAllProducts
}