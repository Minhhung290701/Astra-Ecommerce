//const Users = require('../models/userModel')
const {usersCollection} = require('../models/userModel')

const authAdmin = async (req, res, next) => {
  try {
    // Get user information by id
    let Users = await usersCollection()
    const user = await Users.get(req.user.id)
    //console.log(user)
    if (user.role === 0) return res.status(400).json({msg: "Admin resources access denied."})

    next()
  } catch (err) {
    return res.status(500).json({msg: err.message})
  }
}

module.exports = authAdmin