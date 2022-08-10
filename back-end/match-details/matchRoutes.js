const {
createMatchDetailsController,
    getMatchDetailsByIdController,
    updateMatchDetailsController,
    deleteMatchDetailsController
} = require('./matchControllers')

const matchRouter = require('express').Router()
const authenticateUser = require('../middlewares/authentication')

matchRouter.route('/').post(authenticateUser, createMatchDetailsController)
matchRouter.route('/:id').get(authenticateUser, getMatchDetailsByIdController).patch(authenticateUser, updateMatchDetailsController).delete(authenticateUser, deleteMatchDetailsController)



module.exports = matchRouter