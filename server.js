import express from 'express'
import cors from 'cors'
import AuthRoutes from './routes/auth.js'
import ProductRoutes from './routes/products.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connection from './db/db.js';
import dotenv from 'dotenv';

dotenv.config()

const app = express();
app.use(cors())
app.use(express.json())

app.use('/api/v1/auth', AuthRoutes)
app.use('/api/v1/product', ProductRoutes)

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;


app.listen(PORT, console.log(
  `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
));
