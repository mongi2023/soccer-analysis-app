const CustomError = require("../shared-services/errors");
const { StatusCodes } = require("http-status-codes");
const {
  createVideoService,
  getVideoByIdService,
  updateVideoService,
  deleteVideoService,
} = require("./videoUploaderServices");
const {
  getSequencesOfVideosService,
} = require("../video_sequences/sequenceServices");
const { getProjectByIdService, getProjectByIdService2 } = require("../project/projectServices");
const ffprobeStatic = require('ffprobe-static');
multer = require("multer");
const ffprobe = require("ffprobe");
const moment = require("moment");

const createVideoController = async (req, res) => {
  const { name, size, resolution, extension, origin, project } = req.body;
   if (!name || !size || !resolution || !extension || !origin || !project) {
     throw new CustomError.BadRequestError(
       "All data of video information are mendatory !"
     );
   }
  const video = await createVideoService({ ...req.body });
  res
    .status(StatusCodes.CREATED)
    .send({ video: "Video created successfully !" });
};


const udpateVideoInfoController = async (req, res) => {
  const {
    body: { name },
    user: { userId },
    params: { id: video_id },
  } = req;
  if (!name) {
    throw new CustomError.BadRequestError(
      "Please provide a name for your video"
    );
  }
  const video = await updateVideoService(video_id, userId, { name });
  if (!video) {
    throw new CustomError.NotFoundError(
      "It appears that this video does not exist, please check again !"
    );
  }
  res.status(StatusCodes.OK).send({ msg: "Your video updated successfully !" });
};

const getVideoByIdController = async (req, res) => {
  const video_id = req.params.id;
  const user = req.user.userId;
  const video = await getVideoByIdService(video_id, user);
  if (!video) {
    throw new CustomError.NotFoundError(
      "This video does not exist check again !"
    );
  }
  res.status(StatusCodes.OK).send({ video: video });
};

const getSequencesOfVideoController = async (req, res) => {
  const video_id = req.params.id;
  const user = req.user.userId;

  const sequences = await getSequencesOfVideosService(video_id, user);
  res.status(StatusCodes.OK).send({ sequences: sequences });
};

const deleteVideoController = async (req, res) => {
  const user = req.user.userId;
  const video_id = req.params.id;
  const video = await deleteVideoService(video_id, user);
  if (!video) {
    throw new CustomError.NotFoundError(
      "It appears that this video does not exist, please check again"
    );
  }

  res.status(StatusCodes.OK).send({ msg: "Video deleted successfully !" });
};




  const uploadVideoController = async (req, res,next) => {

  const project_id = req.params.id;
  const project = await getProjectByIdService2(project_id);
  const info=  await ffprobe(`${project.project_path}/${req.file.originalname}`, { path: ffprobeStatic.path })

  const dur = info.streams[0].duration;
  const formatted = moment.utc(dur * 1000).format("HH:mm:ss");
  //var s = moment().duration(dur,'seconds')


 // var display  = moment.duration('20').format("h:mm:ss");



  if (!project) throw new CustomError.NotFoundError("NOT FOUND");
  if(!project_id) throw new CustomError.BadRequestError('missing ID')
  if (!req.file) {
   const error = new  Error('No File !')
   error.httpStatusCode=400
    console.log("No file is available!");
    return next(error)
  }
  if(req.file){
    console.log("File is available!");
    return res.send({
      name: req.file.originalname,
      size: `${((req.file.size) * 0.000001).toFixed(2)} Mb`,
      extension: req.file.originalname.split('.')[1],
      // width :`${info.streams[0].width}`,
      // height:`${info.streams[0].height}`,
      resolution:`${info.streams[0].width}x${info.streams[0].height}`,
      duration: `${formatted}`});

  }
  
};


const upload= multer({storage: multer.diskStorage({

  destination:async (req, file, cb) => {

   const project =  (await getProjectByIdService2(req.params.id).select('project_path')).project_path

    cb(null, `${project}`);

  },
  filename: (req, file, cb) => {

    cb(null, file.originalname);
  },
})}).single('video');


module.exports = {
  upload,
  uploadVideoController,
  udpateVideoInfoController,
  createVideoController,
  getVideoByIdController,
  deleteVideoController,
  getSequencesOfVideoController,
};
