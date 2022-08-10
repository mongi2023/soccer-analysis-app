const Project = require('./projectModel');

const createProjectService = (data) => {
  const project = Project.create(data);
  return project;
};

// .sort('-created_at')
const getProjectsService = (user) => {
  const projects = Project.find({user:user}).sort('-createdAt')
  return projects;
};

const getProjectByIdService = (project_id, user_id) => {
  const project = Project.findOne({_id: project_id, user: user_id});
  return project;
};
const getProjectByIdService2 = (project_id) => {
  const project = Project.findOne({_id: project_id});
  return project;
};
const getProjectByNameService = (name) => {
  const project = Project.findOne({name})
  return project
}

const updateProjectService = (id,userId, data) => {
  const project_to_update = Project.findByIdAndUpdate(
    {_id: id, user: userId},
     data ,
    { new: true, runValidators: true }
  );
  return project_to_update;
};

const deleteProjectService = (id) => {
  const project = Project.findByIdAndDelete(id);
  return project;
};

const updateProjectStatusService = (id) => {
  const project = Project.findByIdAndUpdate(
    id,
    { status: !true },
    { new: true, runValidators: true }
  );
  return project;
};

// GET THE SIZE OF THE PROJECT
const getProjectSizeService = (id) => {};

module.exports = {
  getProjectByIdService2,
  createProjectService,
  getProjectByIdService,
  getProjectsService,
  updateProjectService,
  deleteProjectService,
  getProjectByNameService
};
