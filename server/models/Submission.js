const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  problem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem',
    required: true,
  },
  code: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Failed test', 'Runtime error', 'Compilation error'],
    default: 'Pending',
  },
  language_id: {
    type: Number,
    default: 0,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  timeSubmitted: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Submission', submissionSchema);