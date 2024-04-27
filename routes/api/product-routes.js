const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try{
    const productData = await Product.findAll({
      include: [{model: Tag}]
    })
    res.status(200).json(productData);
  }
  catch(err){
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try{
    const productData = await Product.findByPk(req.params.id,{
      include: [{model: Tag}]
    })
    res.status(200).json(productData);
  }
  catch(err){
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create({
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock
    });
    
    let tag_list = JSON.parse(req.body.tagIds);
    if (tag_list.length) {
      const productTagIdArr = tag_list.map((tag_id) => ({
        product_id: product.id,
        tag_id,
      }));
      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to create product.', error: err });
  }

});



// update product data
router.put('/:id', async (req, res) => {
  try {
    // update product data
    const product = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });


    // update tags infomation
    let new_tag_ids = JSON.parse(req.body.tag_ids)
    
    if (new_tag_ids.length) {
      // search for all product tags using product_id
      const originalProductTags = await ProductTag.findAll({
        where: { product_id: req.params.id }
      });


      // filter to get new tags
      const ori_tag_ids = originalProductTags.map(productTag => productTag.dataValues.tag_id);
      const newProductTags = new_tag_ids
        .filter(tag_id => !ori_tag_ids.includes(tag_id))
        .map(tag_id => ({
          product_id: req.params.id,
          tag_id: tag_id,
        }));


      // filter to get tags needed to delete
      const original_tag_info = originalProductTags.map(productTag => productTag.dataValues);
      const productTagsToRemove = original_tag_info
        .filter(({tag_id}) => !new_tag_ids.includes(tag_id))
        .map(({ id }) => id);
      
      // delete and create tags
      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }
    res.status(200).json({message:"The product has been updated", info:req.body});
  } catch (err) {
    res.status(400).json(err);
  }
});



router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  id_to_delete = req.params.id;
  try{
    await Product.destroy({where: {id: id_to_delete}})
    res.status(200).json({message: "Product has been deleted",id: id_to_delete});
  }
  catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;