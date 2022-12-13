/* const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Category', categorySchema) */

const { getAstraClient } = require("../connections/astradb");


const categoryCollection = async () => {
  //console.log(await (await getAstraClient()).createCollection('users'))
  return (await getAstraClient()).collection('categories')
}

module.exports = {categoryCollection}
