const pool = require('../config/connectDB');
const idData = require('../data/idData.js');

let query;

module.exports = {
    getAllProducts: async (req, res) => {
        try {
            query = 'select * from product';
            const [data] = await pool.execute(query);
            return res.status(200).json({
                message: 'Get all products',
                data: data,
            });
        } catch (err) {
            return res.status(500).json({
                message: 'server error!',
                error: err,
            });
        }
    },

    getProductById: async (req, res) => {
        try {
            query = 'select * from product where idproduct = ?';
            let productId = req.params.id;
            const [product] = await pool.execute(query, [productId]);
            return res.status(200).json({
                message: 'Get product with id',
                product,
            });
        } catch (err) {
            return res.status(500).json({
                message: 'server error!',
                error: err,
            });
        }
    },

    addProduct: async (req, res) => {
        try {
            query =
                'insert into product (idproduct, nameproduct, priceproduct, condproduct) values(?, ?, ?, ?)';
            const { nameproduct, priceproduct, condproduct } = req.body;
            let createId = () => Math.floor(Math.random() * 9999) + 1000;
            let productId = createId();
            await idData().product.map((id) => {
                if (id == createId()) productId = createId();
            });
            idData('add', 'product', productId);
            await pool.execute(query, [
                productId,
                nameproduct,
                priceproduct,
                condproduct,
            ]);
            return res.status(200).json({
                message: 'Product was successfully added!',
            });
        } catch (err) {
            return res.status(500).json({
                message: 'server error!',
                error: err,
            });
        }
    },

    editProduct: async (req, res) => {
        try {
            query =
                'update product set `nameproduct` = ?, `priceproduct` = ?, `condproduct` = ? where idproduct = ?;';
            const productId = req.params.id;
            const { nameproduct, priceproduct, condproduct } = req.body;
            await pool.execute(query, [
                nameproduct,
                priceproduct,
                condproduct,
                productId,
            ]);
            return res.status(200).json({
                message: 'Product was updated!',
            });
        } catch (err) {
            return res.status(500).json({
                message: 'server error!',
                error: err,
            });
        }
    },

    removeProduct: async (req, res) => {
        try {
            const query = 'delete from product where `idproduct` = ?';
            const productId = req.params.id;
            await pool.execute(query, [productId]);
            idData('delete', 'product', productId);
            return res.status(200).json({
                message: 'Product was deleted!',
            });
        } catch (err) {
            return res.status(500).json({
                message: 'server error!',
                error: err,
            });
        }
    },
};
