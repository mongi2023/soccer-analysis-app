const Match = require('./matchModel')



const createMatchDetailsService = (data) => {
    return Match.create(data)
}

const getMatchDetailsByIdService = (id, user) => {
    return Match.findOne({_id: id, user: user})
}

const updateMatchDetailsService = (id, user, data) => {
    return Match.findByIdAndUpdate(
        {_id: id, user: user},
        data,
        {new: true, runValidators: true}
    )
}

const deleteMatchDetailsService = (id, user) => {
    return Match.findByIdAndDelete({_id: id, user: user})
}


module.exports = {
    createMatchDetailsService,
    getMatchDetailsByIdService,
    updateMatchDetailsService,
    deleteMatchDetailsService
}
