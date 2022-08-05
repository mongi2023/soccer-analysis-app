const { upload } = require('./uploadSettings')
const {uploadVideoController} = require('./videoUploaderControllers')
const videoUploaderRouter = require('express').Router()




videoUploaderRouter.post('/', upload.single('video'),uploadVideoController)
module.exports=videoUploaderRouter