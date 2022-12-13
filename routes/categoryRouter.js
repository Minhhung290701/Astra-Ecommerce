const router = require('express').Router()
const categoryController = require('../controllers/categoryController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/category')
  .get(categoryController.getCategories)       //done
  .post(auth, authAdmin, categoryController.createCategory)       //done

router.route('/category/:id')
  .delete(auth, authAdmin, categoryController.deleteCategory)  //chưa xóa product
  .put(auth, authAdmin, categoryController.updateCategory) //done

module.exports = router