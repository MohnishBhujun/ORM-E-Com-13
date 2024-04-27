const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    const categoryData = await Category.findAll({
      include: [{model: Product}]
    })
    res.status(200).json(categoryData);
  }
  catch(err){
    res.status(500).json(err);
  }
  
});

// search by single id
router.get('/:id', async (req, res) => {
  try{
    const categoryData = await Category.findByPk(req.params.id,{
      include: [{model: Product}]
    })
    res.status(200).json(categoryData);
  }
  catch(err){
    res.status(500).json(err);
  }
});

// create category
router.post('/', async (req, res) => {
  // create a new category
  try{
    await Category.create({
      category_name: req.body.category_name

    })
    res.status(201).json({message: "Category has been added to the database",category:req.body.category_name});
  }
  catch(err){
    res.status(500).json(err);
  }
});


// update category
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  id_to_update = req.params.id;
  name_to_update = req.body.category_name;
  try{
    await Category.update({category_name: name_to_update},{where: {id: id_to_update}})
    res.status(200).json({message: "Category has been updated",id: id_to_update,Category: name_to_update});
  }
  catch(err){
    res.status(500).json(err);
  }
  

});


// delete category
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  
  id_to_delete = req.params.id;
  try{
    await Category.destroy({where: {id: id_to_delete}})
    res.status(200).json({message: "Category has been deleted",id: id_to_delete});
  }
  catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;