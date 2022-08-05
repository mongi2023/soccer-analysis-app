const ActionCategory = require('./actionCategoryModel')



const createActionCategoryService = (data) => {
    const category = ActionCategory.create(data)
    return category
}

const getActionCategoryByIdService = (id, user) => {
    const category = ActionCategory.findOne({id, user})
    return category
}

const getActionCategoriesService = (user)=> {
    const categories = ActionCategory.find({user})
    return categories
}

const updateActionCategoryService = (id, user, data) => {
    const category = ActionCategory.findOneAndUpdate(
        {_id: id, user: user},
        data,
        {new: true, runValidators: true}
    )
    return category
}


module.exports = {
    createActionCategoryService,
    getActionCategoriesService,
    getActionCategoryByIdService,
    updateActionCategoryService
}
