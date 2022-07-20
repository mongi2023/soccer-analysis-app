const CustomError = require('../shared-services/errors')
const {StatusCodes} = require('http-status-codes')
const {
createProjectService,
    getProjectByIdService,
    getProjectsService,
    updateProjectService,
    deleteProjectService
} = require('./projectServices')


const createProjectController = async(req, res) => {
    const {
        name,
        description
    } = req.body
    if(name === '') {
        throw new CustomError.BadRequestError('You need to type the name of your project ')
    }
    //creation dossier avec le nom du project
    const project = await createProjectService({...req.body})
    // res.render('pages/project',{msg: ''})
    res.status(StatusCodes.CREATED).send({msg: 'Project created successfully'})
}

const getProjectsController = async(req, res) => {
    // const user = req.user.id
    // if(!user){
    //     throw new CustomError.UnauthenticatedError('you are not authorized')
    // }
    const projects = await getProjectsService()
    
    res.status(StatusCodes.OK).send({projects: projects})
}

const getProjectByIdController = async(req, res) => {
    const project_id = req.params.id
    const project = await getProjectByIdService(project_id)
    if(!project){
        throw new CustomError.NotFoundError('This project does not exist')
    }
    res.status(StatusCodes.OK).send({project: project})
}

const updateProjectController = async(req, res) => {
    const {
        params: {id: project_id},
        body: {name}
    } = req
    if(name === ''){
        throw new CustomError.BadRequestError(`You need to specify a name for you project`)
    }
    console.log(project_id);
    if(!project_id){
        console.log(project_id);
        throw new CustomError.BadRequestError(`Check your ID`)
    }
    const project = await updateProjectService(project_id, req.body)
    if(!project) {
        throw new CustomError.NotFoundError(`Oops ! There was an error check the ID of your project`)
    }
    res.status(StatusCodes.OK).send({msg: 'Project updated successfully'})
}
const deleteProjectController = async(req, res) => {
    const project_id = req.params.id
    const project = await deleteProjectService(project_id)
    if(!project){
        throw new CustomError.NotFoundError(`There was an error, check the ID of your project`)
    }
    res.status(StatusCodes.OK).send({msg: `Project deleted successfully`})
}

module.exports = {
    createProjectController,
    getProjectByIdController,
    getProjectsController,
    deleteProjectController,
    updateProjectController
}