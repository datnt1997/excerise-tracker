const app = require('./server');
const { MongoClient } = require('mongodb');
const UsersDAO = require('./dao/usersDAO');
const ExercisesDAO = require('./dao/exercisesDAO');

const port = process.env.PORT || 9000;

MongoClient.connect(
  process.env.DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true},
)
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async client => {
    await UsersDAO.injectDB(client);
    await ExercisesDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
