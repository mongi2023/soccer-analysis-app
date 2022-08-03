const authenticateUser = require('../middlewares/authentication')
const { registerUserController, loginUserController, logoutUserController } = require('./userControllers')

const userRouter = require('express').Router()



userRouter.post('/register', registerUserController)
userRouter.post('/login', loginUserController)
userRouter.delete('/logout', authenticateUser, logoutUserController)


module.exports = userRouter