const Team = require('./teamModel')

const createTeamService = (data) => {
    const team = Team.create(data)
    return team
}

const getTeamsService = (project, user) => {
    const teams = Team.find({project, user})
    return teams
}

const getTeamByIdService = (id, user) => {
    return Team.findOne({_id:id, user: user})
}

// ! find the team with the specific name
// ? check if the id of the project equals to the objects gotten by the name

const getTeamByNameService = (name, user) => {
    const team = Team.findOne({ name, user });
    return team
}

const updateTeamService = (id, userId,data) => {
    const team = Team.findByIdAndUpdate({_id: id, user: userId}, data, {new: true, runValidators: true})
    return team
}

// const findPlayers


module.exports = {
    createTeamService,
    getTeamByIdService,
    getTeamsService,
    updateTeamService,
    getTeamByNameService
}