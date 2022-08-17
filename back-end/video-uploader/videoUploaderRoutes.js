const authenticateUser = require('../middlewares/authentication')
const {uploadLogo,
    uploadLogoController,upload,uploadVideoController, createVideoController, getVideoByIdController, udpateVideoInfoController, deleteVideoController, getSequencesOfVideoController} = require('./videoUploaderControllers')
const videoUploaderRouter = require('express').Router()




videoUploaderRouter.route('/create').post( createVideoController)
videoUploaderRouter.route('/:id').get(authenticateUser, getVideoByIdController).patch(authenticateUser, udpateVideoInfoController).delete(authenticateUser, deleteVideoController)
videoUploaderRouter.route('/:id').post(upload ,uploadVideoController)
videoUploaderRouter.route('/logo/:id').post(uploadLogo ,uploadLogoController)

videoUploaderRouter.route('/:id/sequences').get(authenticateUser, getSequencesOfVideoController)
// videoUploaderRouter.post('/:id',)

module.exports=videoUploaderRouter