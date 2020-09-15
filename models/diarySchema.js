const mongoose = require('mongoose');
const User = require('./userSchema');
const Schema = mongoose.Schema;

const singleFoodType = {
  serving: {
    type: Schema.Types.Number,
    required: true,
  },
  food: {
    type: Schema.Types.ObjectId,
    ref: 'Food',
    required: true,
  },
};
// const diarySchema = new Schema({
//   diaryDate: [Schema.Types.Date],
//   breakfast: [{type:Schema.Types.ObjectId, ref: 'FoodLog'}],
//   lunch: [{type:Schema.Types.ObjectId, ref: 'FoodLog'}],
//   dinner: [{type:Schema.Types.ObjectId, ref: 'FoodLog'}],
//   snacks: [{type:Schema.Types.ObjectId, ref: 'FoodLog'}]
// })

const diarySchema = new Schema({
  date: Schema.Types.String,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: (value) =>
        User.findOne({ _id: value }, (err, doc) => {
          if (err || !doc) return false;
          else return true;
        }),
      message: (props) => `${props.value} is not value`,
    },
  },
  breakfast: [singleFoodType],
  lunch: [singleFoodType],
  dinner: [singleFoodType],
  snacks: [singleFoodType],
});

// validate user with user_id actually exists


module.exports = {
  Diary: mongoose.model('Diary', diarySchema),
  diarySchema,
};
