const Sequence = require('./sequenceModel');

const createSequenceService = (data) => {
  const sequence = Sequence.create(data);
  return sequence;
};

const getSequenceByIdService = (id, user) => {
  const sequence = Sequence.findOne({ _id: id, user: user });
  return sequence;
};

const getSequencesOfVideosService = (original_video, user) => {
  const sequences = Sequence.find({ original_video, user });
  return sequences;
};

const getSequenceByVideoIdService = (video_id, user) => {
  const sequences = Sequence.find({ user: user, original_video: video_id });
  return sequences;
};

const updateSequenceService = (id, user, data) => {
  const sequence = Sequence.findByIdAndUpdate({ _id: id, user: user }, data, {
    new: true,
    runValidators: true,
  })
  return sequence;
};

const deleteSequenceService = (id) => {
  const sequence = Sequence.findByIdAndDelete(id);
  return sequence;
};

module.exports = {
  createSequenceService,
  getSequenceByIdService,
  getSequencesOfVideosService,
  deleteSequenceService,
  getSequenceByVideoIdService,
  updateSequenceService,
};
