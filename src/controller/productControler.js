const pool = require('../config/connectDB');
let query;

const idStore = {
    product: [],
    user: [],
    checkId: (id, select) => {
        if (select == 'product') return idStore.product.includes(id);
        if (select == 'user') return idStore.user.includes(id);
    },
};

module.exports = {
    getAllProducts: async (req, res) => {
        query = 'select * from product';
        // const [data] = await pool.execute(query);
        // return res.status(200).json({
        //     message: 'get all product',
        //     data: data,
        // });
        await pool.execute(query, (fields, data) => {
            return res.status(200).json({
                message: 'get all product',
                data: data,
                fields: fields,
            });
        });
    },

    addProduct: async (req, res) => {
        query =
            'insert into product (idproduct, nameproduct, priceproduct, condproduct) values(?, ?, ?, ?)';
        const { nameproduct, priceproduct, condproduct } = req.body;
        let createId = () => Math.floor(Math.random() * 9999) + 1000;
        if (idStore.checkId(createId(), 'product')) createId;
        else {
            idStore.product.push(createId());
            console.log(idStore.product);
            await pool.execute(query, [
                createId(),
                nameproduct,
                priceproduct,
                condproduct,
            ]);
            return res.status(200).json({
                message: 'product added successfully!',
            });
        }
    },

    removeProduct: async (req, res) => {
        try {
            const query = 'delete from product where `idproduct` = ?';
            const productId = req.params.id;
            await pool.execute(query, [productId]);
            return res.status(204).json({
                id: productId,
            });
        } catch (err) {
            return res
                .status(500)
                .json({ message: 'server error', error: err });
        }
    },
};
