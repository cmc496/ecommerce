const router = require('express').Router();
const { Product, Category } = require('../../models');
const { sequelize } = require('../../models/Category');

// GET /api/products
router.get('/', (req, res) => {
    Product.findAll({
        attributes: [
            'id',
            'product_name',
            'price',
            'stock',
            'tagIds',
        ],
        include: [
            {
                model: Category,
                attributes: ['id', 'category_name']
            },
            // tag once created
        ]
        
    })
        .then(dbProductData => res.json(dbProductData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/products/1
router.get('/:id', (req, res) => {
    Product.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Category,
                attributes: ['id', 'category_name']
            },
            // tag once created
        ]
    })
        .then(dbProductData => {
            if (!dbProductData) {
                res.status(404).json({ message: 'No product found with this id' });
                return;
            }
            res.json(dbProductData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST /api/products
router.post('/', (req, res) => {});

// PUT /api/products/1
router.put('/:id', (req, res) => {});

// DELETE /api/products/1
router.delete('/:id', (req, res) => {});

module.exports = router;