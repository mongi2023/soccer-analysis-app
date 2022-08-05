const Team = require('./teamModel')



const createTeamService = (data) => {
    const team = Team.create(data)
    return team
}

const getTeamsService = () => {
    const teams = Team.find({})
    return teams
}

const getTeamByIdService = (id) => {
    const team = Team.findById(id)
    return team
}

const updateTeamService = (id, data) => {
    const team = Team.findByIdAndUpdate({_id: id}, data, {new: true, runValidators: true})
}


module.exports = {
    createTeamService,
    getTeamByIdService,
    getTeamsService,
    updateTeamService
}