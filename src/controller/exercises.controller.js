const UsersDAO = require('../dao/usersDAO');
const ExercisesDAO = require('../dao/exercisesDAO');

class ExercisesController {
  static async createExercise(req, res) {
    try {
      const idFromBody = req.params.id;
      if (!idFromBody) {
        return res.json({ error: 'invalid id' });
      }
      const userFromDB = await UsersDAO.getUserByID(idFromBody);
      if (!userFromDB) {
        return res.json({ error: 'invalid id' });
      }
      const currentDate = new Date();
      const currentDateInString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
      const exercise = {
        description: req.body.description,
        duration: Number(req.body.duration),
        date: req.body.date || currentDateInString
      };
      for (const property in exercise) {
        if (!exercise[property] && property !== 'date') {
          return res.json({ error: `invalid ${property}` });
        }
      }

      const updateResult = await ExercisesDAO.createExercise(idFromBody, exercise);
      if (!updateResult.success) {
        return res.json({ error: updateResult.error });
      }
      const dateFromExercise = new Date(exercise.date);
      return res.json(Object.assign({ ...userFromDB, ...exercise }, { date: dateFromExercise.toDateString() }));
    } catch (e) {
      return res.json({ error: e });
    }
  }

  static async getLogs(req, res) {
    try {
      const idFromBody = req.params.id;
      if (!idFromBody) {
        return res.json({ error: 'invalid id' });
      }
      const userFromDB = await UsersDAO.getUserByID(idFromBody);
      if (!userFromDB) {
        return res.json({ error: 'invalid id' });
      }
      const { from = '', to = '', limit = 0 } = req.query;
      let query = {
        user_id: idFromBody,
      };
      if (!!from && !!to) {
        query = Object.assign({ ...query }, {
          date: {
            $gte: from,
            $lte: to
          }
        });
      }
      if (!!!from) {
        query = Object.assign({ ...query }, { date: { $lte: to } });
      }
      if (!!!to) {
        query = Object.assign({ ...query }, { date: { $gte: from } });
      }
      const logs = await ExercisesDAO.getExercises({ ...query }, limit);
      const newLogs = logs.map(item => Object.assign({ ...item }, { date: new Date(item.date).toDateString() }))
      return res.json({ ...userFromDB, count: logs.length, log: newLogs });
    } catch (e) {
      return res.json({ error: e });
    }
  }
}

module.exports = ExercisesController;