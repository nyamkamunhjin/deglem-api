const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userInfo: {
    username: {
      type: Schema.Types.String,
      required: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
    avatar: {
      type: Schema.Types.String,
    },
    email: {
      type: Schema.Types.String,
      required: true,
    },
    firstName: {
      type: Schema.Types.String,
      required: true,
    },
    lastName: {
      type: Schema.Types.String,
      required: true,
    },
    gender: {
      type: Schema.Types.Boolean,
      required: true,
    },
    height: {
      type: Schema.Types.Number,
      required: true,
    },
    dateOfBirth: {
      type: Schema.Types.Date,
      required: true,
    },
  },
  goalInfo: {
    currentWeight: {
      type: Schema.Types.Number,
      required: true,
    },
    goalWeight: {
      type: Schema.Types.Number,
      required: true,
    },
    weeklyGoal: {
      type: Schema.Types.Number,
      required: true,
    },
    activityLevel: {
      type: Schema.Types.Number,
      required: true,
    },
    nutritionGoals: {
      calories: {
        type: Schema.Types.Number,
        required: true,
      },
      carbohydrates: {
        type: Schema.Types.Number,
        required: true,
      },
      protein: {
        type: Schema.Types.Number,
        required: true,
      },
      fat: {
        type: Schema.Types.Number,
        required: true,
      },
    },
  },
  dailyLog: [{ type: Schema.Types.ObjectId, ref: 'Diary'}],
});

module.exports = mongoose.model('User', userSchema);
