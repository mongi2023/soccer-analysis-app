const categoryRouter = require('express').Router()
const {
createActionCategoryController,
    getActionCategoriesController,
    getActionCategoryByIdController,
    udpateActionCategoryController,
    getSubCategoriesOfCategoryController
} = require('./actionCategoryControllers')


categoryRouter.route('/').get(getActionCategoriesController).post(createActionCategoryController)
categoryRouter.route('/:id').get(getActionCategoryByIdController).patch(udpateActionCategoryController)
categoryRouter.route('/:id/sub-categories').get(getSubCategoriesOfCategoryController)


module.exports = categoryRouter