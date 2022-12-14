const {paymentCollection} = require('../models/paymentModel')
const {usersCollection} = require('../models/userModel')
const {productsCollection} = require('../models/productModel')
const {Format} = require('../libs/')

const Products = require('../models/productModel')

const paymentController = {
  getPayments: async (req, res) => {
    try {
      let Payments = await paymentCollection()
      const payments = await Payments.get()

      res.json(Format.formatTo_id(payments))
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  createPayment: async (req, res) => {
    try {
      let Payments = await paymentCollection()
      let Users = await usersCollection()
      const user = await Users.get(req.user.id)
      if (!user) return res.status(400).json({msg: "User does not exist."})

      const {cart, paymentID, address} = req.body;
      const {_id, name, email} = user;
      const newPay = {
        user_id: _id, 
        name: name, 
        email: email, 
        cart: cart,
        address: address, 
        paymentID: paymentID,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const document = await Payments.create(newPay)
       await Payments.update(`${document.documentId}`, {
         _id: document.documentId
       });

      cart.filter(item => {
        return sold(item._id, item.quantity, item.sold)
      })

      res.json({msg: "Payment success."})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  }
}

const sold = async (id, quantity, oldSold) => {
  let Products = await productsCollection()
  await Products.update(id, {
    sold: quantity + oldSold
  })
}

module.exports = paymentController