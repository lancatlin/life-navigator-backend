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
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Goal',
    default: null,
  },
  childs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Goal',
    },
  ],
  createdAt: Date,
  expireAt: Date,
  duration: Number,
  frequency: Number,
  eachTime: Number,
  /*
  preferredTime: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
  },
  */
});

mongoose.model('Goal', goalSchema);
