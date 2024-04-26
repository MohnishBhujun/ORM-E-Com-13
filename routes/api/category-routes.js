const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// function to GET all categories and its associated Products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({include: [{model: Product}]});
    res.status(200).json(categories);
  } catch(err) {
    res.status(500).json({message: 'Not Found'});
  }
});

// function to GET one categories and its associated Products
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {include: [{model: Product}]});
    
    if(!category) {
      res.status(404).json({message: 'id Not Found'});
      return;
    }

    res.status(200).json(category);
  } catch(err) {
    res.status(500).json({message: 'Not Found'});
  }
});

// function to create new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json({message: 'Fail to create a new category!'});
  }
});

// function to update a category by its id value
router.put('/:id', async (req, res) => {
  try {
    const updated = await Category.update(req.body, {where: {id: req.params.id}});
    !updated[0]? res.status(404).json({message: 'id Not Found!'}) : res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({message: 'Fail to update the category'});
  }
});

// function to delete a category by its id value
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Category.destroy({where: {id: req.params.id}});
    !deleted? res.status(404).json({message: 'id Not Found!'}) : res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;