const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  userInfo: {
    username: {
      type: Schema.Types.String,
      required: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
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
    },
    goalWeight: {
      type: Schema.Types.Number,
    },
    weeklyGoal: {
      type: Schema.Types.Number,
    },
    activityLevel: {
      type: Schema.Types.Number,
    },
    nutritionGoals: {
      calories: {
        type: Schema.Types.Number,

      },
      carbohydrates: {
        type: Schema.Types.Number,

      },
      protein: {
        type: Schema.Types.Number,

      },
      fat: {
        type: Schema.Types.Number,

      },
    },
  },
  dailyLog: {
    breakfast: [Schema.Types.ObjectId],
    lunch: [Schema.Types.ObjectId],
    dinner: [Schema.Types.ObjectId],

  },
});

module.exports = mongoose.model('User', userSchema);
