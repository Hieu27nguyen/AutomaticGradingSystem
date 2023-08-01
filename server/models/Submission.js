const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  problem: {
    type: Schema.Types.String,
    ref: 'Problem',
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Failed test', 'Runtime error', 'Compilation error'],
    default: 'Pending',
  },
  timeSubmitted: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Submission', submissionSchema);