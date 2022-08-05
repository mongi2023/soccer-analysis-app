const teamRouter = require('express').Router()
const {
createTeamController,
    getTeamByIdController,
    getTeamsController,
    updateTeamController
} = require('./teamControllers')


teamRouter.route('/').get(getTeamsController).post(createTeamController)
teamRouter.route('/:id').get(getTeamByIdController).patch(updateTeamController)



module.exports = teamRouter