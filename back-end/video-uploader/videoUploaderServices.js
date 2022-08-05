const Video = require('./videoUploaderModel')


const createVideoService = (data) => {
    const video = Video.create(data)
    return video
}

const getVideoByIdService = (id, user) => {
    const video = Video.findById({_id: id, user: user})
    return video
}

const getVideosService = () => {
    const videos = Video.find({})
    return videos
}

const updateVideoService = (id, user, data) => {
    const video = Video.findOneAndUpdate({_id: id, user: user}, data, {new: true, runValidators: true})
    return video
}

const deleteVideoService = (id, user) => {
    const video = Video.findByIdAndDelete ({_id: id, user: user})
    return video
}




module.exports = {
    createVideoService,
    getVideoByIdService,
    getVideosService,
    updateVideoService,
    deleteVideoService
}