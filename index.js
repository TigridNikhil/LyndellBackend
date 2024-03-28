const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const environment = process.env.NODE_ENV || 'development';
dotenv.config({ path: `./config/${environment}.env` });
const { testConnection } = require('./Database/Db');
const cors = require("cors")
const usersRouter = require('./routes/users');
const app = express();



app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use('/', usersRouter);

// Route handler for '/'
app.get('/', (req, res) => {
  console.log("Request received for '/'");
  res.send("hei");
});

// const PORT = process.env.DB_PORT || 5000; // Use PORT environment variable or default to 5001
app.listen(5000, () => {
  console.log("Server Listening on port " );
});

// Test database connection
testConnection();