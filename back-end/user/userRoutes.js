const authenticateUser = require('../middlewares/authentication')
const { registerUserController, loginUserController, logoutUserController, updateProfileUserController } = require('./userControllers')

const userRouter = require('express').Router()



userRouter.post('/register', registerUserController)
userRouter.post('/login', loginUserController)
userRouter.delete('/logout', authenticateUser, logoutUserController)
userRouter.patch('/:id/profile', authenticateUser, updateProfileUserController)


module.exports = userRouter