const CustomError = require('../shared-services/errors');
const fs = require('fs');
const { resolve } = require('path');
const path = require('path');
const { StatusCodes } = require('http-status-codes');
const {
  createProjectService,
  getProjectByIdService,
  getProjectsService,
  updateProjectService,
  deleteProjectService,
  getProjectByNameService,
} = require('./projectServices');

/**
 * Commenting the function
 * @param {*} req 
 * @param {*} res 
 */
const createProjectController = async (req, res) => {
  const { name, project_path, description } = req.body;
  // path.join(__dirname, '..', 'test', 'karma.conf.js')
  req.body.project_path = path.join(
    __dirname,
    '..',
    'my_projects',
    name.split(' ').join('')
  );
  if (!name) {
    throw new CustomError.BadRequestError('Please provide the project name');
  }
  const projectName = name.split(' ').join('');

  const isExist = await getProjectByNameService(name);

  if (isExist) {
    throw new CustomError.BadRequestError('This project is already exist');
  }
  //creation dossier avec le nom du project
  req.body.user = req.user.userId;
  const project = await createProjectService({ ...req.body });
  if (!fs.existsSync(resolve('my_projects', projectName))) {
    fs.mkdirSync(resolve('my_projects', projectName), { recursive: true });
  }

  res.status(StatusCodes.CREATED).json({ msg: 'Project created successfully' });
};

const getProjectsController = async (req, res) => {
  const user = req.user.userId;
  const projects = await getProjectsService(user);
  res.status(StatusCodes.OK).json({ projects: projects });
};

const getProjectByIdController = async (req, res) => {
  const project_id = req.params.id;
  const project = await getProjectByIdService(project_id, req.user.userId);
  if (!project) {
    throw new CustomError.NotFoundError('This project does not exist');
  }
  res.status(StatusCodes.OK).json({ project: project });
};

/**
 * Update the name project both folder and data in db
 * @param {*} req coming from client
 * @param {*} res send from the service
 */
const updateProjectController = async (req, res) => {
  const {
    params: { id: project_id },
    user: { userId },
    body: { name, description },
  } = req;
  if (name === '') {
    throw new CustomError.BadRequestError(
      `You need to specify a name for you project`
    );
  }
  
  const project = await updateProjectService(project_id, userId, {name, description});
  if (!project) {
    throw new CustomError.NotFoundError(
      `Oops ! There was an error check the ID of your project`
    );
  }
  res.status(StatusCodes.OK).json({ msg: 'Project updated successfully' });
};


const deleteProjectController = async (req, res) => {
  const project_id = req.params.id;
  const user = req.user.userId
  // ! deleting a projet => delete the folder and its conetent
  // const getProjectPath = await getProjectByIdService(project_id, user).select('+project_path')
  // if(getProjectPath){
  //   fs.rmSync(getProjectPath.project_path, {recursive: true, force: true})
  // }
  const project = await deleteProjectService(project_id);

  if (!project) {
    throw new CustomError.NotFoundError(
      `There was an error, check the ID of your project`
    );
  }
  res.status(StatusCodes.OK).json({ msg: `Project deleted successfully` });
};

module.exports = {
  createProjectController,
  getProjectByIdController,
  getProjectsController,
  deleteProjectController,
  updateProjectController,
};
