const subCategoryRouter = require('express').Router()
const authenticateUser = require('../middlewares/authentication')
const { createActionSubCategoryController } = require('./actionSubCategoryControllers')



subCategoryRouter.route('/').post(authenticateUser, createActionSubCategoryController)


module.exports = subCategoryRouter