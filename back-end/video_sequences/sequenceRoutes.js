const sequenceRouter = require('express').Router()

const {createSequenceController, updateSequenceController, getSequenceByIdController} = require('./sequenceControllers')
const authenticateUser = require('../middlewares/authentication')

sequenceRouter.route('/').post(authenticateUser, createSequenceController)
sequenceRouter.route('/:id').get(authenticateUser, getSequenceByIdController).patch(authenticateUser, updateSequenceController)

module.exports = sequenceRouter