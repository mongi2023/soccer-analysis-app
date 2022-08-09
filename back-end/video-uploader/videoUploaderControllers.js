const CustomError = require("../shared-services/errors");
const { StatusCodes } = require("http-status-codes");
const {
  createVideoService,
  getVideoByIdService,
  getVideosService,
  updateVideoService,
  deleteVideoService,
} = require("./videoUploaderServices");
const {
  getSequencesOfVideosService,
} = require("../video_sequences/sequenceServices");
const { getProjectByIdService } = require("../project/projectServices");
multer = require("multer");
const fse = require("fs-extra");
const { path, resolve } = require("path");
const createVideoController = async (req, res) => {
  const { name, size, resolution, extension, origin, project } = req.body;

  if (!name || !size || !resolution || !extension || !origin || !project) {
    throw new CustomError.BadRequestError(
      "All data of video information are mendatory !"
    );
  }
  req.body.user = req.user.userId;
  const video = await createVideoService({ ...req.body });
  res
    .status(StatusCodes.CREATED)
    .send({ video: "Video created successfully !" });
};

//********************************************************************** */
const uploadVideoController = async (req, res) => {
  const project_id = req.params.id;
  if(!project_id) throw new CustomError.BadRequestError('missing ID')
  const project = await getProjectByIdService(project_id, req.user.userId);
  if (!project) throw new CustomError.NotFoundError("NOT FOUND");
  const path_from_project = project.project_path;
  console.log(project);
  fse.writeFileSync('path.txt',path_from_project )
  if (!req.file) {
    console.log("No file is available!");
    return res.send({
      success: false,
    });
  }
  console.log("File is available!");
  return res.send({
    success: true,
  });
};
//******************************************* */
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

// File upload settings


const PATH = fse.readFileSync('path.txt')+'';
console.log(PATH);

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let upload = multer({
  storage: storage,
});

module.exports = {
  upload,
  uploadVideoController,
  udpateVideoInfoController,
  createVideoController,
  getVideoByIdController,
  deleteVideoController,
  getSequencesOfVideoController,
};
