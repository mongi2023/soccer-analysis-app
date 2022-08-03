const UserApp = require('./userModel')



const registerUserService = (data) => {
    const user = UserApp.create(data)
    return user
}

const getUserByIdService = (id) => {
    const user = UserApp.findById(id)
    return user
}

const getUserByEmailService = (email) => {
    const user = UserApp.findOne({email: email})
    return user
}


const updateUserProfileService = (id, data) => {
    const user = UserApp.findOneAndUpdate({id}, data, {new: true, runValidators: true})
    return user
}

const updateUserPasswordService = (id, password) => {
    const user = UserApp.findOneAndUpdate({id}, password, {new: true, runValidators: true})
    return user
}

module.exports = {
    registerUserService,
    getUserByEmailService,
    getUserByIdService,
    updateUserPasswordService,
    updateUserProfileService
}