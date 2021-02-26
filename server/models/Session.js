import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  name: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  time: [Boolean],
});

mongoose.model('Session', sessionSchema);
