const { getAstraClient } = require("../connections/astradb");


const productsCollection = async () => {
  return (await getAstraClient()).collection('products')
}

module.exports = {productsCollection}

