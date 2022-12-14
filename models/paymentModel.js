const { getAstraClient } = require("../connections/astradb");


const paymentCollection = async () => {
  return (await getAstraClient()).collection('payments')
}
module.exports = {paymentCollection}
