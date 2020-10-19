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
  },
  nutritionGoals: {
    calories: {
      value: {
        type: Schema.Types.Number,
        default: () => 2000,
      },
      unit: {
        type: Schema.Types.String,
        default: () => 'cal',
      },
      // required: true,
    },
    totalFat: {
      value: {
        type: Schema.Types.Number,
        default: () => 61,
      },
      unit: {
        type: Schema.Types.String,
        default: () => '%',
      },
    },
    saturatedFat: {
      value: {
        type: Schema.Types.Number,
        default: () => 20,
      },
      unit: {
        type: Schema.Types.String,
        default: () => 'g',
      },
    },
    transFat: {
      value: {
        type: Schema.Types.Number,
      },
      unit: {
        type: Schema.Types.String,
        default: () => 'g',
      },
    },
    polyUnsaturatedFat: {
      value: {
        type: Schema.Types.Number,
      },
      unit: {
        type: Schema.Types.String,
        default: () => 'g',
      },
    },
    monoUnsaturatedFat: {
      value: {
        type: Schema.Types.Number,
      },
      unit: {
        type: Schema.Types.String,
        default: () => 'g',
      },
    },
    cholestrol: {
      value: {
        type: Schema.Types.Number,
        default: () => 300,
      },
      unit: {
        type: Schema.Types.String,
        default: () => 'mg',
      },
    },
    sodium: {
      value: {
        type: Schema.Types.Number,
        default: () => 2300,
      },
      unit: {
        type: Schema.Types.String,
        default: () => 'mg',
      },
    },
    totalCarbohydrates: {
      value: {
        type: Schema.Types.Number,
        default: () => 40,
      },
      unit: {
        type: Schema.Types.String,
        default: () => '%',
      },
    },
    dietaryFibers: {
      value: {
        type: Schema.Types.Number,
        default: () => 30,
      },
      unit: {
        type: Schema.Types.String,
        default: () => 'g',
      },
    },
    sugars: {
      value: {
        type: Schema.Types.Number,
        default: () => 30,
      },
      unit: {
        type: Schema.Types.String,
        default: () => 'g',
      },
    },
    addedSugars: {
      value: {
        type: Schema.Types.Number,
      },
      unit: {
        type: Schema.Types.String,
        default: () => 'g',
      },
    },
    sugarAlchohols: {
      value: {
        type: Schema.Types.Number,
      },
      unit: {
        type: Schema.Types.String,
        default: () => 'g',
      },
    },
    protein: {
      value: {
        type: Schema.Types.Number,
        default: () => 20,
      },
      unit: {
        type: Schema.Types.String,
        default: () => '%',
      },
    },
    vitaminD: {
      value: {
        type: Schema.Types.Number,
        default: () => 600,
      },
      unit: {
        type: Schema.Types.String,
        default: () => 'µg',
      },
    },
    calcium: {
      value: {
        type: Schema.Types.Number,
        default: () => 1000,
      },
      unit: {
        type: Schema.Types.String,
        default: () => 'mg',
      },
    },
    iron: {
      value: {
        type: Schema.Types.Number,
        default: () => 15,
      },
      unit: {
        type: Schema.Types.String,
        default: () => 'mg',
      },
    },
    potassium: {
      value: {
        type: Schema.Types.Number,
        default: () => 3500,
      },
      unit: {
        type: Schema.Types.String,
        default: () => 'mg',
      },
    },
    vitaminA: {
      value: {
        type: Schema.Types.Number,
        default: () => 900,
      },
      unit: {
        type: Schema.Types.String,
        default: () => 'µg',
      },
    },
    vitaminC: {
      value: {
        type: Schema.Types.Number,
        default: () => 75,
      },
      unit: {
        type: Schema.Types.String,
        default: () => 'mg',
      },
    },
  },
  dailyLog: [{ type: Schema.Types.ObjectId, ref: 'Diary' }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
