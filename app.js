const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser, requireAdmin, realUser} = require('./middleware/authMiddleware');
const { get_todos } = require('./controllers/todoController');
const { logout_get } = require('./controllers/authController');
require('dotenv').config({ path : ".env"})

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection

mongoose.connect(process.env.DBURL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(process.env.REALPORT))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser)
app.get('/', (req, res) => res.render('home'));
app.get('/veileder', checkUser, requireAuth, requireAdmin, (req,res) => res.render('veileder'))
app.get('/login', (req,res)=>res.render('login'));
app.get('/signup', (req,res)=>res.render('signup'));
app.get('/logout', logout_get)
app.get('/:user', checkUser, requireAuth, get_todos);
app.use(authRoutes);

