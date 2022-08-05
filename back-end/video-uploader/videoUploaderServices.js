const Video = require('./videoUploaderModel')


const createVideoService = (data) => {
    const video = Video.create(data)
    return video
}

const getVideoByIdService = (id) => {
    const video = Video.findById(id)
    return video
}

const getVideosService = () => {
    const videos = Video.find({})
    return videos
}

const updateVideoService = (id, data) => {
    const video = Video.findOneAndUpdate({_id: id}, data, {new: true, runValidators: true})
    return video
}

const deleteVideoService = (id) => {
    const video = Video.findOneAndDelete(id)
    return video
}


module.exports = {
    createVideoService,
    getVideoByIdService,
    getVideosService,
    updateVideoService,
    deleteVideoService
}