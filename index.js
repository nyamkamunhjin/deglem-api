const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api-foods');

require('dotenv').config();

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use('/api/foods', apiRouter);

app.get('/', (req, res) => {
  res.json({ message: 'hello from deglem' });
});

// connect to mongo db
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0-bojs0.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then(() => {
    console.log('Connected to Mongo Atlas');
    app.listen(process.env.PORT, () => {
      console.log('Listening on port:', process.env.PORT);
    });
  })
  .catch((err) => console.log(err));

const { testUser, testDiary } = require('./db-test');
const User = require('./models/userSchema');
const userSchema = require('./models/userSchema');
const { Diary } = require('./models/diarySchema');
// testUser.save()
// testDiary.save((err, doc) => {
//   // save diary id to user daily log
//   if (err) console.log(err);
//   else {
//     console.log(doc.user_id);
//     userSchema.findOneAndUpdate(
//       { _id: doc.user_id },
//       { $push: { dailyLog: doc._id } },
//       { new: true },
//       (err, doc) => {
//         if (err) console.log(err);
//         else {
//           console.log('Document successful created and linked with user');
//           console.log(doc);
//         }
//       }
//     );
//   }
// });

// User.findByIdAndUpdate(
//   { _id: '5f604a4277de91086fd50b63' },
//   { $push: { dailyLog: testDiary } },
//   { new: true},
//   (err, doc) => {
//     if(err) console.log('Error updating user dailylog')
//     console.log(doc)
//   }
// );
// User.findByIdAndUpdate(
//   { _id: '5f604a4277de91086fd50b63', 'dailyLog.id': 0 },
//   { $push: { 'dailyLog.$.breakfast': {
//     serving: 3,
//     food: mongoose.Types.ObjectId('5f363641127c0f0f3799990a')
//   } } },
//   { new: true },
//   (err, doc) => {
//     if (err) console.log('Error updating user dailylog', err);
//     console.log(doc);
//   }
// );
// Diary.findOneAndUpdate(
//   { _id: '5f60875bfa98a910d541160a' },
//   {
//     $push: {
//       breakfast: {
//         serving: 5,
//         food: '5f6082d1467bac0f6bd69686',
//       },
//     },
//   },
//   { new: true, upsert: true },
//   (err, doc) => {
//     if(err) console.log(err)
//     else {
//       console.log('doc successfully updated')
//     }
//   }
// );
User.findOne({ _id: '5f607f85a586e00e416f2124' })
  .populate({ path: 'dailyLog', populate: {
    path: 'breakfast'
  } })
  .exec((err, doc) => {
    if (err) console.log(err);
    else {
      console.log(doc.dailyLog[0]);
    }
  });
