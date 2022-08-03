const { upload } = require('./uploadSettings')
const {uploadVideoController, createVideoController, getVideoByIdController, udpateVideoInfoController, deleteVideoController, getSequencesOfVideoController} = require('./videoUploaderControllers')
const videoUploaderRouter = require('express').Router()




videoUploaderRouter.post('/', upload.single('video'),uploadVideoController)
videoUploaderRouter.route('/create').post(createVideoController)
videoUploaderRouter.route('/:id').get(getVideoByIdController).patch(udpateVideoInfoController).delete(deleteVideoController)
videoUploaderRouter.route('/:id/sequences').get(getSequencesOfVideoController)

module.exports=videoUploaderRouter