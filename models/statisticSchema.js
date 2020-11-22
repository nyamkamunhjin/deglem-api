const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StatsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  weights: [
    {
      date: Schema.Types.Date,
      weight: Schema.Types.Number,
    },
  ],
});

module.exports = mongoose.model('Stats', StatsSchema);
