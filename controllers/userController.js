const {usersCollection} = require('../models/userModel')
const {paymentCollection} = require('../models/paymentModel')
const {Format} = require('../libs/')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userController = {
  register: async (req, res) => {
    try {
      const {name, email, password} = req.body;
      let Users = await usersCollection()
      const user = await Users.findOne({ email: {$eq : email} })
      if (user) return res.status(400).json({msg: "The email already exists."})
      if (password.length < 6) return res.status(400).json({msg: "Password is at least 6 charactes long."})
      // Password encryption
      const passwordHash = await bcrypt.hash(password, 10)
      const newUser ={
       name : name, 
       email : email, 
       password: passwordHash,
       cart: [],
       role: 0,
       createdAt: new Date()
      }
      const document = await Users.create(newUser)
      await Users.update(`${document.documentId}`, {
        _id: document.documentId
      });

      // Create jsonwebtoken to authentication
      const accesstoken = createAccessToken({id: document.documentId})
      const refreshtoken = createRefreshToken({id: document.documentId})

      res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        path: '/user/refresh_token',
        maxAge: 7*24*60*60*1000 
      })

      res.json({accesstoken})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  login: async (req, res) => {
    try {
      const {email, password} = req.body;
      let Users = await usersCollection()

      const user = await Users.findOne({ email: {$eq : email} })
      if (!user) return res.status(400).json({msg: "User does not exist."})

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return res.status(400).json({msg: "Incorrect password."})

      // If login success, create accesstoken and refreshtoken
      const accesstoken = createAccessToken({id: user._id})
      const refreshtoken = createRefreshToken({id: user._id})

      res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        path: '/user/refresh_token',
        maxAge: 7*24*60*60*1000 
      })

      res.json({accesstoken})
    } catch (err) {
      return res.status(500).json({msg: err.message})      
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie('refreshtoken', {path: '/user/refresh_token'})

      return res.json({msg: "Logged out."})
    } catch (err) {
      return res.status(500).json({msg: err.message})            
    }
  },
  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({msg: "Please Login or Register."})

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({msg: "Please Login or Register."})

        const accesstoken = createAccessToken({id: user.id})
        res.json({user, accesstoken})
      })

    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  getUser: async (req, res) => {
    try {
      let Users = await usersCollection()
      const user = await Users.get(req.user.id)
      if (!user) return res.status(400).json({msg: "User does not exist."})

      res.json(user)
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  addToCart: async (req, res) => {
    try {
      let Users = await usersCollection()
      const user = await Users.get(req.user.id)
      if (!user) return res.status(400).json({msg: "User does not exist."})
      await Users.update(req.user.id,{cart: req.body.cart})
      return res.json({msg: "Added to cart."})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  history: async (req, res) => {
    try {
      let Payments = await paymentCollection()
      const history = await Payments._get(null,{
        params: {
          where: {
            user_id: {$eq: req.user.id}
          },
        }})
      const historyEnd = Format.formatTo_id(history)
      console.log(historyEnd)
      res.json(historyEnd)
    } catch (err) {
      return res.status(500).json({msg: err.message})      
    }
  }
}

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '11m'})
}

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = userController