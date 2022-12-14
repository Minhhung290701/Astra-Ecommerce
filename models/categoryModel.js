const { getAstraClient } = require("../connections/astradb");

const categoryCollection = async () => {
  return (await getAstraClient()).collection('categories')
}

module.exports = {categoryCollection}
