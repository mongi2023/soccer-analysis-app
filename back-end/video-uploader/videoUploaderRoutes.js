const authenticateUser = require('../middlewares/authentication')
const { upload,move } = require('./uploadSettings')
const {uploadVideoController, createVideoController, getVideoByIdController, udpateVideoInfoController, deleteVideoController, getSequencesOfVideoController} = require('./videoUploaderControllers')
const videoUploaderRouter = require('express').Router()




videoUploaderRouter.post('/:id',upload.single('video'), authenticateUser,uploadVideoController)
videoUploaderRouter.route('/create').post(createVideoController)
videoUploaderRouter.route('/:id').get(getVideoByIdController).patch(udpateVideoInfoController).delete(deleteVideoController)
videoUploaderRouter.route('/:id/sequences').get(getSequencesOfVideoController)

module.exports=videoUploaderRouter