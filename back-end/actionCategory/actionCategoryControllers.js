const {
    createActionCategoryService,
        getActionCategoriesService,
        getActionCategoryByIdService,
        updateActionCategoryService
    } = require('./actionCategoryServices')
    
    const {StatusCodes} = require('http-status-codes')
    const CustomError = require('../shared-services/errors')
    const { getActionSubCategoriesByIdCategoryService } = require('../actionSubCategory/actionSubCategoryServices')
    
    
    
    const createActionCategoryController = async(req, res) => {
        const {
             name, description
        } = req.body
    
        if(!name) {
            throw new CustomError.BadRequestError('You need to provide the name and the description')
        }
        req.body.user = req.user.userId
        const action_category = await createActionCategoryService({...req.body})
        res.status(StatusCodes.CREATED).send({msg: 'Category created successfully'})
    }
    
    
    const getActionCategoryByIdController = async(req, res) => {
        const category_id = req.params.id
        const user = req.user.userId
    
        const category = await getActionCategoryByIdService(category_id, user)
        if(!category) {
            throw new CustomError.NotFoundError(`There is no category with this id`)
        }
    
        res.status(StatusCodes.OK).send({category: category})
    }
    const getActionCategoriesController = async ( req, res ) => {
        const user = req.user.userId
        const categories = await getActionCategoriesService(user)
        res.status(StatusCodes.OK).send({categories: categories})
    }
    
    const udpateActionCategoryController = async( req, res ) => {
        const {
            body: {name, description},
            user: {userId},
            params: {id: id}
        } = req
        if(!name || !description) {
            throw new CustomError.BadRequestError(`Please provide a name and a description`)
        }
        console.log(userId)
        const category = await updateActionCategoryService(id, userId, req.body)
        if(!category) {
            throw new CustomError.NotFoundError(`It appears that this category does not exist`)
        }
    
        res.status(StatusCodes.OK).send({msg: `Updated successfully`, category_updated: category})
    
    }
    const getSubCategoriesOfCategoryController = async(req, res) => {
        const category_id = req.params.id
        const user = req.user.userId
        const subCategories = await getActionSubCategoriesByIdCategoryService(category_id, user)
        if(!subCategories){
            throw new CustomError('it appears that there is no category with this id')
        }
        res.status(StatusCodes.OK).send({sub_categories: subCategories, counts : subCategories.length})
    }
    
    module.exports = {
        getSubCategoriesOfCategoryController,
        createActionCategoryController,
        getActionCategoriesController,
        getActionCategoryByIdController,
        udpateActionCategoryController
    }