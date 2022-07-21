const Project = require('./projectModel');

const createProjectService = (data) => {
  const project = Project.create(data);
  return project;
};

const getProjectsService = () => {
  const projects = Project.find({});
  return projects;
};

const getProjectByIdService = (id) => {
  const project = Project.findById(id);
  return project;
};
const getProjectByNameService = (name) => {
  const project = Project.findOne({name})
  return project
}

const updateProjectService = (id, data) => {
  const project_to_update = Project.findByIdAndUpdate(
    {_id: id},
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
  createProjectService,
  getProjectByIdService,
  getProjectsService,
  updateProjectService,
  deleteProjectService,
  getProjectByNameService
};
