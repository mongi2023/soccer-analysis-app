const authenticateUser = require('../middlewares/authentication')
const {upload,uploadVideoController, createVideoController, getVideoByIdController, udpateVideoInfoController, deleteVideoController, getSequencesOfVideoController} = require('./videoUploaderControllers')
const videoUploaderRouter = require('express').Router()




videoUploaderRouter.route('/create').post(authenticateUser, createVideoController)
videoUploaderRouter.route('/:id').get(authenticateUser, getVideoByIdController).post([upload.single('video'), authenticateUser],uploadVideoController).patch(authenticateUser, udpateVideoInfoController).delete(authenticateUser, deleteVideoController)
videoUploaderRouter.route('/:id/sequences').get(authenticateUser, getSequencesOfVideoController)
// videoUploaderRouter.post('/:id',)

module.exports=videoUploaderRouter