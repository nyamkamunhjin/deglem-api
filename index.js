const express = require('express');
const morgan = require('morgan');
const app = express();

require('dotenv').config();

app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.json({ message: 'hello from deglem' });
});

app.listen(process.env.PORT, () => {
  console.log('listening on port:', process.env.PORT);
});
