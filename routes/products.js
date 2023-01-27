

import express from 'express'
import { addProduct, deleteProduct, editProduct, getOneProduct, getAllProducts } from '../controllers/product.js';
const router = express.Router();


router.route('/')
.post(addProduct)
.delete(deleteProduct)
.patch(editProduct)
.get(getAllProducts)

router.route('/one')
.post(getOneProduct)

export default router