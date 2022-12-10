import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import productRoutes from './routes/products.route';
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

productRoutes(app);

app.listen(port, () => {
    console.log('server is running on port ', port);
});
