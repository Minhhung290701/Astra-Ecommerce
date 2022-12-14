const router = require('express').Router()
const productController = require('../controllers/productController')

router.route('/products') 
  .get(productController.getProducts)         //gần done
  .post(productController.createProduct)     //done

router.route('/products/:id')
  .delete(productController.deleteProduct)      //done
  .put(productController.updateProduct)           //done

module.exports = router