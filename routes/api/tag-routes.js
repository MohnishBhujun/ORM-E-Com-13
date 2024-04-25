const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  //Finding all tags
  try{
    const tagData = await Tag.findAll({
      include: [{model: Product}]
    })
    res.status(200).json(tagData);
  }
  catch(err){
    res.status(500).json(err);
  }


});

router.get('/:id', async (req, res) => {
  //Finding a single tag by its `id`
  try{
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    })
    res.status(200).json(tagData);
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  //Creating a new tag
  try{
    await Tag.create({tag_name: req.body.tag_name});
    res.status(200).json({message: 'New tag created',tag_name: req.body.tag_name});
  }
  catch(err){
    res.status(400).json(err);
  }
  
});

router.put('/:id', async(req, res) => {
  //Updating a tag's name by its `id` value
  try{
    await Tag.update({tag_name:req.body.tag_name}, { where:{id: req.params.id}
      
    })
    res.status(200).json({message: 'Tag updated', tag_name: req.body.tag_name});
  }
  catch(err){
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  //Deleting on tag by its `id` value
  id_to_delete = req.params.id;
  try{
    await Tag.destroy({where: {id: id_to_delete}})
    res.status(200).json({message: "Tag has been deleted",id: id_to_delete});
  }
  catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;