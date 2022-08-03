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


const createProjectController = async (req, res) => {
  const { name,path , description } = req.body;
  if (!name || !path) {
    throw new CustomError.BadRequestError(
      "Please provide the project path and name"
    );
  }
  const projectName = name.split(" ").join("");

  const isExist = await getProjectByNameService(name);

  if (isExist) {
    throw new CustomError.BadRequestError("This project is already exist");
  }
  //creation dossier avec le nom du project
  req.body.user = req.user.userId
  const project = await createProjectService({ ...req.body });
  if (!fs.existsSync(resolve("my_projects", projectName))) {
    fs.mkdirSync(resolve("my_projects", projectName), { recursive: true });
  }

  res.status(StatusCodes.CREATED).send({ msg: "Project created successfully" });

  // res.render('pages/project',{msg: ''})
};

const getProjectsController = async (req, res) => {
  const user = req.user.userId
  // if(!user){
  //     throw new CustomError.UnauthenticatedError('you are not authorized')
  // }
  console.log("Connected User : " , user);
  const projects = await getProjectsService(user);

  res.status(StatusCodes.OK).send({ projects: projects });
};

const getProjectByIdController = async (req, res) => {
  const project_id = req.params.id;
  const project = await getProjectByIdService(project_id, req.user.userId);
  if (!project) {
    throw new CustomError.NotFoundError("This project does not exist");
  }
  res.status(StatusCodes.OK).send({ project: project });
};

const updateProjectController = async (req, res) => {
  const {
    params: { id: project_id },
    user: {userId},
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
  const project = await updateProjectService(project_id, userId, req.body);
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
