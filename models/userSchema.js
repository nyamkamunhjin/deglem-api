const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = new Schema({
  userInfo: {
    username: {
      type: Schema.Types.String,
      required: true,
      unique: true,
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
      unique: true,
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
      type: Schema.Types.String,
      enum: ['Male', 'Female'],
      default: 'Male',
    },
    dateOfBirth: {
      type: Schema.Types.Date,
      required: true,
    },
  },
  goalInfo: {
    height: {
      type: Schema.Types.Number,
      // required: true,
    },
    currentWeight: {
      type: Schema.Types.Number,
      // required: true,
    },
    goalWeight: {
      type: Schema.Types.Number,
      // required: true,
    },
    weeklyGoal: {
      type: Schema.Types.Number,
      // required: true,
    },
    activityLevel: {
      type: Schema.Types.String,
      enum: ['Sedentary', 'Lightly Active', 'Active', 'Very Active'],
      default: 'Sedentary',
      // required: true,
    },
    nutritionGoals: {
      calories: {
        type: Schema.Types.Number,
        // required: true,
      },
      carbohydrates: {
        type: Schema.Types.Number,
        // required: true,
      },
      protein: {
        type: Schema.Types.Number,
        // required: true,
      },
      fat: {
        type: Schema.Types.Number,
        // required: true,
      },
    },
  },
  dailyLog: [{ type: Schema.Types.ObjectId, ref: 'Diary' }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
