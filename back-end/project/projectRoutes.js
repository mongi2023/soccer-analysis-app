const projectRouter = require('express').Router()
const {
createProjectController,
    getProjectByIdController,
    getProjectsController,
    deleteProjectController,
    updateProjectController
} = require('./projectControllers')

/**
 * , projectRouter, function(req, res){
    res.render('pages/projects')
}
 */
projectRouter.route('/').get(getProjectsController).post(createProjectController)
projectRouter.route('/:id').get(getProjectByIdController).delete(deleteProjectController).patch(updateProjectController)


module.exports = projectRouter