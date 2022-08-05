const playerRouter = require('express').Router()
const {
createPlayerController,
    getPlayerByIdController,
    getPlayersController,
    updatePlayerController
} = require('./playerControllers')

const authenticateUser = require('../middlewares/authentication')

playerRouter.route('/').get(authenticateUser, getPlayersController).post(authenticateUser, createPlayerController)
playerRouter.route('/:id').get(authenticateUser, getPlayerByIdController).patch(authenticateUser, updatePlayerController)



module.exports = playerRouter