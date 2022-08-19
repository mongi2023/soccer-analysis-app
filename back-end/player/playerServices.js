const Player = require('./playerModel')




const createPlayerService = (data) => {
    const player = Player.create(data)
    return player
}

const getPlayerByIdService = (id, userId) => {
    const player = Player.findOne({_id:id, user: userId})
    return player
}

const getPlayersService = (userId) => {
    const players = Player.find({user: userId})
    return players
}
const checkPlayerNumberService = (number) => {
    return Player.findOne({number})
}

const updatePlayerService = (id,userId, data) => {
    const player = Player.findOneAndUpdate({_id: id, user: userId}, data, {new: true, runValidators: true})
    return player
}

const getPlayersTeamService = (team, user) => {
    const players = Player.find({team, user})
    return players
}


const getPlayersTeamNumbersService = (team,number, user) => {
    const players = Player.find({team: team,number:number ,user: user})
    return players
}



module.exports = {
    createPlayerService,
    getPlayerByIdService,
    getPlayersService,
    updatePlayerService,
    getPlayersTeamService,
    checkPlayerNumberService,
    getPlayersTeamNumbersService
}