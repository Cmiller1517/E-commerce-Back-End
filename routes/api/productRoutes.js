const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// Homepage to get all products
router.get('/', (req, res) => {
// This allows you to find products with the corisponding categories and product tags 
  Product.findAll(
    {
      include: [
        {
          model: Category,
          attributes: ['category_name']
        },
        {
          model: Tag,
          attributes: ['tag_name']
        }
      ]
    }
  ).then((productData) => {
    res.json(productData);
  });
});

// Find just one specific item by its individual ID
router.get('/:id', (req, res) => {
  // associated category and tag data
  Product.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Category,
      attributes: ['category_name']
    },
    {
      model: Tag,
      attributes: ['tag_name']
    }
    ]
  }).then((productData) => {
    res.json(productData);
  });

});

// This section of code allows you to create a new product, along with the (Product Name, Price, Stock, and tags)
router.post('/', (req, res) => {
//  EXAMPLE
    // {
    //   product_name: "Callaway Super Soft Golf Balls",
    //   price: 49.99,
    //   stock: 90,
    //   tagIds: [1, 2, 3, 4]
    // }
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// UPDATES PRODUCT 
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find the tags from productTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // lists tag ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  Product.destroy({
    where: {
      id: req.params.id
    }}).then((productData) => {
      res.json(productData);
    });
});

module.exports = router;