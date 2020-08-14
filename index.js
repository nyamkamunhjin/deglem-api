const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api-routes');

require('dotenv').config();

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use('/api', apiRouter);

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
