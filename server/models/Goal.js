import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Goal',
  },
  childs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Goal',
    },
  ],
  expireAt: Date,
  Duration: Number,
  Frequency: Number,
  EachTime: Number,
  /*
  PreferredTime: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
  },
  */
});

mongoose.model('Goal', goalSchema);
