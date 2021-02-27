import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  name: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  time: [Number],
});

export default mongoose.model('Session', sessionSchema);

export const defaultSession = (userId) => {
  const t = new Array(24).fill(0).map((_, i) => (8 <= i && i < 22 ? 1 : 0));
  return new Session({
    userId,
    name: 'default',
    time: new Array(7).fill(encode(t)),
  });
};

export const encode = (array) => {
  let result = 0;
  for (let v of array) {
    result <<= 1;
    result += v;
  }
  return result;
};

export const decode = (num, length) => {
  const array = new Array(length);
  for (let i = 0; i < length; i++) {
    array[length - 1 - i] = num % 2;
    num >>= 1;
  }
  return array;
};
