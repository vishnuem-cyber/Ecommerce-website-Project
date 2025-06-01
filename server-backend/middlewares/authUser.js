const jwt = require('jsonwebtoken')
const authUser = (req, res, next) => {
   try {
         //collect token from cookies
         const {token} = req.cookies

         // no token- unauthorized user
            if(!token){
                  return res.status(401).json({message:"user not authorized"})
            }

         // token decode
            const decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY)

         //issues with token
            if(!decodedToken){
                  return res.status(401).json({message:"Invalid token"})
            }
            console.log(decodedToken)
            
         //attach token to req
            req.user = decodedToken
         //next
         next()

   } catch (error) {
      console.log(error)
   
   }
}

module.exports = authUser