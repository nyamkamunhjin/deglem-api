const mongoose = require('mongoose');
const User = require('./userSchema');
const Schema = mongoose.Schema;

const singleFoodTypeSchema = new Schema({
  serving: {
    type: Schema.Types.Number,
    required: true,
  },
  food: {
    type: Schema.Types.ObjectId,
    ref: 'Food',
    required: true,
  },
});

const diarySchema = new Schema({
  date: Schema.Types.Date,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      // validate user with user_id actually exists
      validator: (value) =>
        User.findOne({ _id: value }, (err, doc) => {
          if (err || !doc) return false;
          else {
            console.log(doc);
            return true;
          }
        }),
      message: (props) => `${props.value} is not value`,
    },
  },
  breakfast: [singleFoodTypeSchema],
  lunch: [singleFoodTypeSchema],
  dinner: [singleFoodTypeSchema],
  snacks: [singleFoodTypeSchema],
  water: { type: Schema.Types.Number, default: () => 0 },
});

diarySchema.post('findOneAndUpdate', async (doc) => {
  // console.log('post findOneAndUpdate hook: ', doc);
  const user = await User.findById({ _id: doc.user_id });
  if (!user.dailyLog.includes(doc._id)) {
    user.dailyLog.push(doc._id);
    user.save((err, doc) => {
      if (err || !doc) console.log(err);
      else {
        console.log('linked diary doc to user.');
      }
    });
  } else {
    console.log('user already linked.');
  }
});

diarySchema.post('findOneAndDelete', async (doc) => {
  console.log('post findOneAndDelete hook: ', doc);
  // const user = await User.findById({ _id: doc.user_id });
  // if (!user.dailyLog.includes(doc._id)) {
  //   user.dailyLog.push(doc._id);
  //   user.save((err, doc) => {
  //     if (err || !doc) console.log(err);
  //     else {
  //       console.log('linked diary doc to user.');
  //     }
  //   });
  // } else {
  //   console.log('user already linked.');
  // }
});

module.exports = {
  Diary: mongoose.model('Diary', diarySchema),
  SingleFood: mongoose.model('SingleFood', singleFoodTypeSchema),
  diarySchema,
};
