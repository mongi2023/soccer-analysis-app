const {StatusCodes} = require('http-status-codes')
const CustomError = require('../shared-services/errors')
const {
createTeamService,
    getTeamByIdService,
    getTeamsService,
    updateTeamService
} = require('./teamServices')


const createTeamController = async(req,res) => {
    const {name,
           creation_date,
           logo} = req.body
    if(name === '' || creation_date === '' || logo === ''){
        throw new CustomError.BadRequestError(`All team's data are mandatory`)
    }
    const team = await createTeamService({...req.body})
    res.status(StatusCodes).send({msg: `Team added successfully`})
}

const getTeamsController = async(req, res) => {
    const teams = await getTeamsService()
    res.status(StatusCodes.OK).send({teams: teams})
}

const getTeamByIdController = async(req, res) => {
    const team_id = req.body.id
    const team = await getTeamByIdService(team_id)
    if(!team){
        throw new CustomError.NotFoundError(`There is no team with the id : ${team_id}`)
    }
    res.status(StatusCodes.OK).send({team: team})
}

const updateTeamController = async(req, res) => {
    const {
        params: {id: team_id},
        body: {name, creation_date,logo}
    } = req
    if(name === '' || creation_date === '' || logo === ''){
        throw new CustomError.BadRequestError(`All fields needs to be filled`)
    }
    const team = await updateTeamService(team_id, req.body)
    res.status(StatusCodes.OK).send({msg: `Team updated successfully`})
}


module.exports = {
    createTeamController,
    getTeamByIdController,
    getTeamsController,
    updateTeamController
}