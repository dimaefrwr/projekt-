const express = require('express');
const session = require('express-session');
const connectDB = require('./database');
const app = express();
const port = 3000;

connectDB();

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(session({
  secret: 'tajny_klucz',
  resave: false,
  saveUninitialized: true
}));

const authRouter = require('./routes/auth');
const concertRouter = require('./routes/concert');

app.get('/', (req, res) => {
  res.redirect('/concert'); 
});

app.use('/auth', authRouter);
app.use('/concert', concertRouter);

app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
