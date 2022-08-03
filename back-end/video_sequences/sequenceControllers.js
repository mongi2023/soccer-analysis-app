const CustomError = require('../shared-services/errors');
const {
  createSequenceService,
  getSequenceByIdService,
  deleteSequenceService,
  updateSequenceService,
} = require('./sequenceServices');
const { StatusCodes } = require('http-status-codes');
const moment = require('moment');

const createSequenceController = async (req, res) => {
  const user = req.user.userId;
  req.body.user = req.user.userId;

  const {
    name,
    start_time,
    end_time,
    category,
    subCategory,
    player,
    original_video,
  } = req.body;
  console.log('user => ', user);
  if (
    !name ||
    !start_time ||
    !end_time ||
    !category ||
    !subCategory ||
    !player ||
    !original_video
  ) {
    throw new CustomError.BadRequestError(`All data are mendatory`);
  }

  const sequence = await createSequenceService({ ...req.body });
  res.status(StatusCodes.CREATED).send({ sequence });
};

const getSequenceByIdController = async(req, res) => {
    const sequence_id = req.params.id
    const user = req.user.userId
    const sequence = await getSequenceByIdService(sequence_id, user).populate('player')
    if(!sequence) {
        throw new CustomError.NotFoundError('It appears that this sequence do not exist, please, check again!')
    }
    res.status(StatusCodes.OK).send({sequence: sequence})
}

const updateSequenceController = async(req, res) => {
  const {
    body: {name, start_time, end_time, category, subCategory},
    user: {user},
    params: {id: sequence_id}
  } = req
  const sequence = await updateSequenceService(sequence_id, user, {name, start_time, end_time, category, subCategory})
  if(!sequence) {
    throw new CustomError.NotFoundError('It appears that sequence do not exist, please check again !')
  }
  res.status(StatusCodes.OK).send({msg: 'sequence udpated successfully'})
}


const deleteSequenceController = async (req, res) => {
  const sequence_id = req.params.id;
  const user = req.user.userId;

  const sequence = await deleteSequenceService(sequence_id, user);
  if (!sequence) {
    throw new CustomError.NotFoundError(
      'It appears that this sequence do not exist, please check again'
    );
  }
  res.status(StatusCodes.OK).send({ msg: 'Sequence deleted successfully !' });
};

module.exports = {
  createSequenceController,
  getSequenceByIdController,
  updateSequenceController
};
