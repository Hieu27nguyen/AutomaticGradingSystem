const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  problem: {
    type: String,
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
  timeSubmitted: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Submission', submissionSchema);