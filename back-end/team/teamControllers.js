const Team  = require('./teamModel')
const { StatusCodes } = require('http-status-codes');
const { getPlayersTeamService } = require('../player/playerServices');
const { getProjectByIdService } = require('../project/projectServices');
const CustomError = require('../shared-services/errors');
const {
  createTeamService,
  getTeamByIdService,
  getTeamsService,
  updateTeamService,
  getTeamByNameService,
} = require('./teamServices');

/**
 * ? Create a team controller
 * @param {*} req
 * @param {*} res
 */
const createTeamController = async (req, res) => {
  const userId = req.user.userId;
  const { name, creation_date, logo, project } = req.body;
  if (!name || !creation_date || !logo || !project) {
    throw new CustomError.BadRequestError(`All team's data are mandatory`);
  }

  // ! Check if the project belongs to the connected user
  const projectBelongsToTheConnectedUser = await getProjectByIdService(
    project,
    userId
  );
  if (!projectBelongsToTheConnectedUser) {
    throw new CustomError.BadRequestError('This project does not exist');
  }
  const isTeamExist = await getTeamByNameService(name, userId);
  console.log(isTeamExist);
  // const userId = req.user.userId
  // ! Team exist within the DB
  if (isTeamExist) {
    throw new CustomError.BadRequestError(
      'This team is already created, please choose another name'
    );
  }

  // ! Team exist within the PROJECT
  if (isTeamExist !== null) {
    if (isTeamExist.project.equals(project)) {
      throw new CustomError.BadRequestError(
        'This team is already created within this Project'
      );
    }
  }

  req.body.user = req.user.userId;
  const team = await createTeamService({ ...req.body });
  res.status(StatusCodes.CREATED).send({ msg: `Team added successfully` });
};

/**
 * ? Get all the teams within a specific project, created
 * ? by the connected user
 * @param {*} req
 * @param {*} res
 */
const getTeamsController = async (req, res) => {
  const project = req.body.project;
  const userId = req.user.userId;

  const doesProjectExist = await getProjectByIdService(project, userId);
  if (!doesProjectExist) {
    throw new CustomError.NotFoundError('The project does not exist');
  }
  const teams = await getTeamsService(project, userId);
  //  ! TODO : NEEDS A CORRECTION IMMEDIATELY
  //   if(!teams[0].user.equals(userId)){
  //     throw new CustomError.NotFoundError('No team')
  //   }
  res.status(StatusCodes.OK).send({ teams: teams });
};

const getTeamByIdController = async (req, res) => {
  const team_id = req.params.id;
  const userId = req.user.userId;
  if (!userId) {
    throw new CustomError.UnauthenticatedError('You are not authorized!');
  }
  const team = await getTeamByIdService(team_id, userId);
  console.log('erer',`${team}`);

  if (!team) {
    throw new CustomError.NotFoundError(
      `There is no team with the id : ${team_id}`
    );
  }
  res.status(StatusCodes.OK).send({ team: team });
};

const updateTeamController = async (req, res) => {
  const {
    params: { id: team_id },
    user: { userId },
    body: { name, creation_date, logo, project },
  } = req;
  if (!userId) {
    throw new CustomError.UnauthenticatedError('You are not authorized!');
  }
  if (!name || !creation_date || !logo || !project) {
    throw new CustomError.BadRequestError(`All fields needs to be filled`);
  }
  const find_team_using_id = await getTeamByIdService(team_id, userId);
  if (!find_team_using_id) {
    throw new CustomError.NotFoundError('No team with the this id');
  }

  // * Find the teams with the same name except for this current team
  const isTeamExist = await getTeamByNameService(name, userId)
    .where('_id')
    .ne(team_id);
  console.log(isTeamExist);
  if (isTeamExist) {
    throw new CustomError.BadRequestError('This team is already exist');
  }
  const team = await updateTeamService(team_id, req.body);
  if (!team) {
    throw new CustomError.NotFoundError('There is no team with this id');
  }
  res.status(StatusCodes.OK).send({ msg: `Team updated successfully` });
};

const getPlayersOfTeamController = async(req, res) => {
  const {
    params: {id: team_id},
    user: {userId}
  } = req
  const doesTeamBelongsToConnctedUser = await getTeamByIdService(team_id, userId)
  if(!doesTeamBelongsToConnctedUser){
    throw new CustomError.NotFoundError('This team does not exist')
  }
  const squad = await getTeamByIdService(team_id, userId).populate('players')
  res.status(StatusCodes.OK).send({players: squad})
}

module.exports = {
  createTeamController,
  getTeamByIdController,
  getTeamsController,
  updateTeamController,
  getPlayersOfTeamController
};
