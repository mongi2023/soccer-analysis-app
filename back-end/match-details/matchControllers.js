const {
createMatchDetailsService,
    getMatchDetailsByIdService,
    updateMatchDetailsService,
    deleteMatchDetailsService
} = require('./matchServices')

const CustomError = require('../shared-services/errors')
const {StatusCodes} = require('http-status-codes')



const createMatchDetailsController = async(req, res) => {
    const {
        stadium, referee, teams
    } = req.body
    if(!stadium || !referee || !teams) throw new CustomError.BadRequestError('All data are mentadory')
    req.body.user = req.user.userId
    const match = await createMatchDetailsService({...req.body})
    res.status(StatusCodes.CREATED).send({msg: 'Match details created successfully '})
}

const getMatchDetailsByIdController = async(req, res) => {
    const match_id = req.params.id
    const user = req.user.userId
    const match = await getMatchDetailsByIdService(match_id, user)
    if(!match) {
        throw new CustomError.NotFoundError('It appears that this match do not exist')
    }
    res.status(StatusCodes.OK).send({match: match})
}

const updateMatchDetailsController = async(req, res) => {
    const {
        body: {stadium, referee, teams},
        user: {user},
        params: {id: match_id}
    } = req
    if(!stadium || !referee || !teams) {
        throw new CustomError.BadRequestError('Please provide all the data')
    }
    const match = await updateMatchDetailsService(match_id, user, {stadium, referee, teams})
    if(!match){
        throw new CustomError.NotFoundError('It appears that this match do not exist, please check again !')
    }

    res.status(StatusCodes.OK).send({msg: 'Match details updated successfully'})
}

const deleteMatchDetailsController = async(req, res) => {
    const match_id = req.params.id
    const user = req.user.userId
    const match = await deleteMatchDetailsService(match_id, user)
    if(!match) throw new CustomError.NotFoundError('Not found')
    res.status(StatusCodes.OK).send({msg: 'Deleted successfully'})
}


module.exports = {
    createMatchDetailsController,
    getMatchDetailsByIdController,
    updateMatchDetailsController,
    deleteMatchDetailsController
}