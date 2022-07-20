const CustomError = require('../shared-services/errors')
const {StatusCodes} = require('http-status-codes')
const {
createVideoService,
    getVideoByIdService,
    getVideosService,
    updateVideoService,
    deleteVideoService
} = require('./videoUploaderServices')


const createVideoController = async(req, res) => {
    const {
        name,
        size,
        resolution,
        extension,
        origin,
        projectID
    } = req.body
}