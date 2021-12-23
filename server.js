const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const usersRoute = require('./src/route/users.route');

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Register api routes
app.use("/api/users", usersRoute)

app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

module.exports = app;