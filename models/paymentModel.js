const { getAstraClient } = require("../connections/astradb");


const paymentCollection = async () => {
  //console.log(await (await getAstraClient()).createCollection('users'))
  return (await getAstraClient()).collection('payments')
}
/* const a = async() => {
  let Products = await paymentCollection()
  //console.log(await Products.get())
}
a()
 */
module.exports = {paymentCollection}


/* const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: Object,
    required: true
  },
  paymentID: {
    type: String,
    required: true
  },
  cart: {
    type: Array,
    default: []
  },
  status: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

module.exports = mongoose.model("Payments", paymentSchema) */