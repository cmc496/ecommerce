const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET /api/categories
router.get('/', (req, res) => {
    Category.findAll({
        attributes: [
            'id',
            'category_name',
        ],
        include: [
            {
                model: Product,
                attributes: ['id', 'project_name', 'price', 'stock', 'category_id']
            }
        ]
    })
        .then(dbCategoryData => res.json(dbCategoryData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/categories/1
router.get('/:id', (req, res) => {
    Category.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'category_name',
            // reference to products
            
        ]
    })
        .then(dbCategoryData => {
            if (!dbCategoryData) {
                res.status(404).json({ message: 'No category found with this id' });
                return;
            }
            res.json(dbCategoryData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST /api/categories
router.post('/', (req, res) => {});

// PUT /api/categories/1
router.put('/:id', (req, res) => {});

// DELETE /api/categories/1
router.delete('/:id', (req, res) => {});

module.exports = router;