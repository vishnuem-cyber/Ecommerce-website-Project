const express = require('express')
const userRouter = express.Router()

const {register,login, profile,logout,update,deleteUser } = require('../controllers/userController')
const authUser = require('../middlewares/authUser')
const authAdmin = require('../middlewares/authAdmin')




//signup
// /api/user/register
userRouter.post('/register', register)

//login
// /api/user/login
userRouter.post('/login',login)




//logout
userRouter.get('/logout',logout)




//profile 
userRouter.get('/profile',authUser,profile) 

 //profile update
 userRouter.patch('/update',authUser,update)


 //profile delete
    userRouter.delete('/delete/:userId',authAdmin,deleteUser)




 module.exports = userRouter;