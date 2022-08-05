const teamRouter = require('express').Router()
const {
createTeamController,
    getTeamByIdController,
    getTeamsController,
    updateTeamController,
    getPlayersOfTeamController
} = require('./teamControllers')

const authenticateUser = require('../middlewares/authentication')


teamRouter.route('/').post(authenticateUser, createTeamController)
teamRouter.route('/teams-list').post(authenticateUser, getTeamsController)
teamRouter.route('/:id').get(authenticateUser, getTeamByIdController).patch(authenticateUser, updateTeamController)
teamRouter.route('/:id/players').get(authenticateUser, getPlayersOfTeamController)



module.exports = teamRouter