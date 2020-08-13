const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

require('dotenv').config();

const Food = require('./models/foodSchema');

app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.json({ message: 'hello from deglem' });
});






// connect to mongo db
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0-bojs0.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('listening on port:', process.env.PORT);
    });
  })
  .catch((err) => console.log(err));

// const potato = new Food({
//   name: 'Potato',
//   serving: {
//     size: 1,
//     unit: 'medium',
//     servingPerContainer: 1
//   },
//   calories: 110,
//   totalFat: 0.2,
//   saturatedFat: 0,
//   transFat: 0,
//   polyUnsaturatedFat: 0,
//   monoUnsaturatedFat: 0,
//   cholestrol: 0,
//   sodium: 0,
//   totalCarbohydrates: 26,
//   dietaryFibers: 2,
//   sugars: 2,
//   addedSugars: 0,
//   sugarAlchohols: 0,
//   protein: 3,
//   vitaminD: 0,
//   calcium: 2,
//   iron: 6,
//   potassium: 620,
//   vitaminA: 0,
//   vitaminC: 45
// });

// potato.save();