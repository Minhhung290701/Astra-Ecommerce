const router = require('express').Router()
const userController = require('../controllers/userController')
const auth = require('../middleware/auth')

router.post('/register', userController.register) //done

router.post('/login', userController.login)  //done

router.get('/logout', userController.logout)  //done

router.get('/refresh_token', userController.refreshToken)  //done

router.get('/infor', auth, userController.getUser) //done

router.patch('/addcart', auth, userController.addToCart)      //done

router.get('/history', auth, userController.history)

module.exports = router
