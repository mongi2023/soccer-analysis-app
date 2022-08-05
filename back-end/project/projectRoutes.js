const projectRouter = require('express').Router()
const {
createProjectController,
    getProjectByIdController,
    getProjectsController,
    deleteProjectController,
    updateProjectController
} = require('./projectControllers')
const authenticateUser = require('../middlewares/authentication')

/**
 * , projectRouter, function(req, res){
    res.render('pages/projects')
}
 */
projectRouter.route('/').get(authenticateUser, getProjectsController).post(authenticateUser, createProjectController)
projectRouter.route('/:id').get(authenticateUser, getProjectByIdController).delete(authenticateUser, deleteProjectController).patch(authenticateUser, updateProjectController)


module.exports = projectRouter