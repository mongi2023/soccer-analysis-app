const CustomError = require("../shared-services/errors");
const fs = require("fs");
const { resolve } = require("path");
const { StatusCodes } = require("http-status-codes");
const {
  createProjectService,
  getProjectByIdService,
  getProjectsService,
  updateProjectService,
  deleteProjectService,
  getProjectByNameService,
} = require("./projectServices");

// if (!fs.existsSync(videoPathDest)){
//     fs.mkdirSync('new_project', { recursive: true });
// }
// //copier video from original to new project
//   fs.copyFile(videoPath, videoPathDest, function(err) {
//     if (err) {
//       console.log(err)
//     } else {
//     //  console.log("vodeo original was copied to copy_video .")
//     }
//   })
const createProjectController = async (req, res) => {
  const { name, description } = req.body;
  if (name === "") {
    throw new CustomError.BadRequestError(
      "You need to type the name of your project "
    );
  }
  const projectName = name.split(" ").join("");

  const isExist = await getProjectByNameService(name);

  if (isExist) {
    throw new CustomError.BadRequestError("This project is already exist");
  }
  //creation dossier avec le nom du project
  const project = await createProjectService({ ...req.body });
  if (!fs.existsSync(resolve("my_projects", projectName))) {
    fs.mkdirSync(resolve("my_projects", projectName), { recursive: true });
  }

  res.status(StatusCodes.CREATED).send({ msg: "Project created successfully" });

  // res.render('pages/project',{msg: ''})
};

const getProjectsController = async (req, res) => {
  // const user = req.user.id
  // if(!user){
  //     throw new CustomError.UnauthenticatedError('you are not authorized')
  // }
  const projects = await getProjectsService();

  res.status(StatusCodes.OK).send({ projects: projects });
};

const getProjectByIdController = async (req, res) => {
  const project_id = req.params.id;
  const project = await getProjectByIdService(project_id);
  if (!project) {
    throw new CustomError.NotFoundError("This project does not exist");
  }
  res.status(StatusCodes.OK).send({ project: project });
};

const updateProjectController = async (req, res) => {
  const {
    params: { id: project_id },
    body: { name },
  } = req;
  if (name === "") {
    throw new CustomError.BadRequestError(
      `You need to specify a name for you project`
    );
  }
  console.log(project_id);
  if (!project_id) {
    console.log(project_id);
    throw new CustomError.BadRequestError(`Check your ID`);
  }
  const project = await updateProjectService(project_id, req.body);
  if (!project) {
    throw new CustomError.NotFoundError(
      `Oops ! There was an error check the ID of your project`
    );
  }
  res.status(StatusCodes.OK).send({ msg: "Project updated successfully" });
};
const deleteProjectController = async (req, res) => {
  const project_id = req.params.id;
  const project = await deleteProjectService(project_id);
  if (!project) {
    throw new CustomError.NotFoundError(
      `There was an error, check the ID of your project`
    );
  }
  res.status(StatusCodes.OK).send({ msg: `Project deleted successfully` });
};

module.exports = {
  createProjectController,
  getProjectByIdController,
  getProjectsController,
  deleteProjectController,
  updateProjectController,
};
