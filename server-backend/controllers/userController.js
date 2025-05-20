
const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const createToken = require('../utils/generateToken')


//register
const register = async (req, res, next) => {

  try {
    // input-variable store
    const { name, email, password, profilePic } = req.body || {}

    //valid input
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are mandatory" })
    }
    //check if user exists
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ error: "User already exists" })
    }


    //password hashing
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)





    //user save to db
    const newUser = new User({ name, email, password: hashedPassword, profilePic })
    const savedUser = await newUser.save()

    // remove password from user to send back
    const userData = savedUser.toObject()
    delete userData.password

    res.status(201).json({ message: "Account created", userData })


  } catch (error) {
    console.log(error)
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' })
  }

}

//login
const login = async (req, res, next) => {
  try {
    //input-variable store
    const { email, password } = req.body || {}
    //valid input
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are mandatory" })
    }
    //check if user exists
    const userExists = await User.findOne({ email })
    if (!userExists) {
      return res.status(400).json({ error: "User not found" })
    }
    //compare password
    const passwordMatch = await bcrypt.compare(password, userExists.password)
    if (!passwordMatch) {
      return res.ststus(400).json({ error: "Invalid password" })
    }
    //token creation
    const token = createToken(userExists._id, userExists.role)
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',

    });
    const userObject = userExists.toObject()
    delete userObject.password
    return res.status(200).json({ message: "Login successful", userObject })

  } catch (error) {
    console.log(error)
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' })

  }
}


//profile
const profile = async (req, res, next) => {
  try {
    const userId = req.user.id

    const userData = await User.findById(userId).select("-password")
    return res.status(200).json({ data: userData, message: "Profile retrieved" })

  } catch (error) {
    console.log(error)
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' })

  }
}


//profile update
const update = async (req, res, next) => {
  try {
    const userId = req.user.id
    const { name, email, password, profilePic } = req.body || {}


    const userData = await User.findByIdAndUpdate(userId, { name, email, password, profilePic },
       { new: true }).select("-password")
    return res.status(200).json({ data: userData, message: "Profile updated successfully" })

  } catch (error) {
    console.log(error)
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' })

  }
}

//delete user
const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" })
      }
    
    const userData = await User.findByIdAndDelete(userId)
    if (!userData){
      return res.status(404).json({ error: "User not found" })
    }

    return res.status(200).json({ deletedUser: userData._id, message: "User Deleted" })
  } catch (error) {
    console.log(error)
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' })
  }
}

//logout

const logout = async (req, res, next) => {
  try {
    res.clearCookie('token')
    res.status(200).json({
      success: true,
      message: "Logout successfully"
    })
  } catch (error) {
    console.log(error)
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' })
  }
}


module.exports = { register, login, profile, logout, update, deleteUser }