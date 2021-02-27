import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expireAt: Date,
  duration: Number,
  frequency: Number,
  eachTime: Number,
  completedTime: {
    type: Number,
    default: 0,
  },
  description: String,
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
    required: true,
  },
});

export default mongoose.model('Goal', goalSchema);
