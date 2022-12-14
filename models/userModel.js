const { getAstraClient } = require("../connections/astradb");


const usersCollection = async () => {
  return (await getAstraClient()).collection('users')
}

module.exports = {usersCollection}