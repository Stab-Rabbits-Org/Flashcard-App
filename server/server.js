const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const userRouter = require('./router/userRouter');
const deckRouter = require('./router/deckRouter');

require('dotenv').config();

const deckController = require('./controllers/DeckController');
const cardController = require('./controllers/CardController');
=======
const Deck = require('./model');

require('dotenv').config();

const deckController = require('./DeckController');
const cardController = require('./CardController');
>>>>>>> 2b584f18aad326f6a2d162009cfda18bce170923

app.use(express.json());

app.use(cors({ origin: '*' }));

console.log('this is right before deck controller');

<<<<<<< HEAD
app.use('/', userRouter);
app.use('/', deckRouter);
app.use('/', deckController);
app.use('/deck', cardController);

app.use('*', (req, res) => res.status(404).send('Page not found'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught an unknown middlware error',
    status: 500,
    message: { err: 'An error occured' },
  };

  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).send(errorObj.message);
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(`${error} did not connect`));

app.listen(process.send.PORT, () => console.log(`Server Port: ${PORT}`));
