const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { update } = require('../../models/Product');

// The `/api/tags` endpoint

// Function to GET all tags and its associated Product data
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({message: 'Tags Not Found!'});
  }
});

// Function to GET single tag by its 'id' and its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    if(!tagData) {
      res.status(404).json({message: 'No tag found with this id!'});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({message: 'No tag found!'});
  }
});

// Function to create a tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json({message: 'Fail to create a Tag!'});
  }
});

// Function to update a tag's name by its 'id' value
router.put('/:id', async (req, res) => {
  try {
    const updated = await Tag.update(req.body, {
      where: {id: req.params.id},
    });
    !updated[0]
    ? res.status(404).json({ message: 'No tag found with this id!' })
    : res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Fail to update a Tag!'});
  }
});

// Function to delete tag by it's 'id' value
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Tag.destroy({where: {id: req.params.id}});
    !deleted
    ? res.status(404).json({ message: 'No tag found with this id!' })
    : res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json({ message: 'Fail to update a Tag!'});
  }
});

module.exports = router;