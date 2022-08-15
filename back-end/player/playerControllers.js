const {
    createPlayerService,
        getPlayerByIdService,
        getPlayersService,
        updatePlayerService
    } = require('./playerServices')
    const {StatusCodes} = require('http-status-codes')
    const CustomError = require('../shared-services/errors')
    const { getTeamByIdService } = require('../team/teamServices')
    
    // FIXME : Player number should not be repeated within just the club
    const createPlayerController = async(req, res) => {
        const {
            fullname,
            birth_date,
            number,
            picture,
            position,
            team,
            project
        } = req.body
        if(!fullname || !birth_date || !number || !picture || !position || !team || !project ) {
            throw new CustomError.BadRequestError('All fields are required, Please provide all player data')
        }
        // * Getting the userId
        const user = req.user.userId
        req.body.user = req.user.userId
    
        const isTeamBelongsToConnectedUser = await getTeamByIdService(team, user)
        console.log(isTeamBelongsToConnectedUser)
        
        if(!isTeamBelongsToConnectedUser){
            throw new CustomError.NotFoundError('This team does not exist, please check again!')
        }
        const player = await createPlayerService({fullname, birth_date, number, picture, position, team, project,user})
        res.status(StatusCodes.CREATED).send({msg: 'Player created successfully!'})
    }
    
    const getPlayerByIdController = async(req, res) => {
        const player_id = req.params.id
        const user = req.user.userId
        const player = await getPlayerByIdService(player_id, user)
        
        if(!player) {
            throw new CustomError.NotFoundError('No player with this id')
        }
        res.status(StatusCodes.OK).send({player: player})
    }
    
    const getPlayersController = async ( req, res ) => {
        const userId = req.user.userId
        const players = await getPlayersService(userId)
        res.status(StatusCodes.OK).send({players: players})
    }
    
    const updatePlayerController = async(req, res) => {
        const {
            params: {id: player_id},
            body: {fullname,birth_date, number, picture,position,team,project}
        } = req
        if(!fullname || !birth_date || !number || !picture || !position || !team || !project) {
            throw new CustomError.BadRequestError('Fields should be filled')
        }
        const player = await updatePlayerService(player_id, req.body)
        if(!player){
            throw new CustomError.NotFoundError('No Player with this id')
        }
        res.status(StatusCodes.OK).send({msg: 'Player updated successfully'})
    }
    
    
    module.exports = {
        createPlayerController,
        getPlayerByIdController,
        getPlayersController,
        updatePlayerController
    }