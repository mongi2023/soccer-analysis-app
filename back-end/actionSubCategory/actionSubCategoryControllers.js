const {
    createActionSubCategoryService,
        getActionSubCategoriesByIdCategoryService,
        getActionSubCategoriesService,
        updateActionSubCategoryService
    } = require('./actionSubCategoryServices')
    const {StatusCodes} = require('http-status-codes')
    const CustomError = require('../shared-services/errors')
    
    
    
    
    const createActionSubCategoryController = async(req, res) => {
        req.body.user = req.user.userId
        const {
            name, category
        }= req.body
        if(!name || !category){
            throw new CustomError.BadRequestError('Please provide the name and the description')
        }
        const sub_category = await createActionSubCategoryService({...req.body})
        res.status(StatusCodes.CREATED).send({msg: 'sub-category created successfully'})
    }
    
    
    
    
    module.exports = {
        createActionSubCategoryController
    }