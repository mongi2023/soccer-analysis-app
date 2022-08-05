const CustomError = require('../shared-services/errors')
const {StatusCodes} = require('http-status-codes')
const {
createVideoService,
    getVideoByIdService,
    getVideosService,
    updateVideoService,
    deleteVideoService
} = require('./videoUploaderServices')
const PATH = "./uploads";

const ffprobe = require('ffprobe')
 const ffprobeStatic = require('ffprobe-static');

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
 
 const uploadVideoController=  async (req, res)=> {
  const info=  await ffprobe(`${PATH}/${req.file.originalname}`, { path: ffprobeStatic.path })
  const dur = info.streams[0].duration;
  if (!req.file) {
    console.log("No file is available!");
    return res.send({
      success: false
    });

  } else {
    console.log('File is available!');
    return  res.send({
      name: req.file.originalname.split('.')[0],
      size: `${((req.file.size) * 0.000001).toFixed(2)} Mb`,
      extension: req.file.originalname.split('.')[1],
      width :info.streams[0].width,
      height:`${info.streams[0].height}p`,
      duration: `${dur.split('.')[0].slice(0,2)}.${dur.split('.')[1].slice(0,2)} seconds`
    })
  }
//*************** */




}
module.exports={uploadVideoController}