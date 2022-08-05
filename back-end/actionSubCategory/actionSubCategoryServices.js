const ActionSubCategory = require('./actionSubCategoryModel')



const createActionSubCategoryService = (data) => {
    const subCategory = ActionSubCategory.create(data)
    return subCategory
}

const getActionSubCategoriesByIdCategoryService = (category, user) => {
    const subCategories = ActionSubCategory.find({category, user})
    return subCategories
}

const getActionSubCategoriesService = () => {
    const subCategories = ActionSubCategory.find({})
    return subCategories
}


const updateActionSubCategoryService = (id, user, data) => {
    const subCategory = ActionSubCategory.findOneAndUpdate(
        {_id: id, user: user},
        data,
        {new: true, runValidators: true}
    )
    return subCategory
}

module.exports = {
    createActionSubCategoryService,
    getActionSubCategoriesByIdCategoryService,
    getActionSubCategoriesService,
    updateActionSubCategoryService
}