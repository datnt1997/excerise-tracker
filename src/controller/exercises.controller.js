const UsersDAO = require('../dao/usersDAO');

class ExercisesController {
  static async createExercise(req, res) {
    try {
      const idFromBody = req.params.id;
      if (!idFromBody) {
        return res.json({ error: 'invalid id' });
      }
      const userFromDB = await UsersDAO.getUserByID(idFromBody);
      if(!userFromDB){
        return res.json({ error: 'invalid id' });
      }
      const currentDate = new Date();
      const exercise = {
        description: req.body.description,
        duration: req.body.duration,
        date: req.body.date ||  currentDate.toDateString()
      };
      for (const property in exercise) {
        if (!exercise[property] && property !== 'date') {
          return res.json({ error: `invalid ${property}` });
        }
      }

      const updateResult = await UsersDAO.createExercise(idFromBody, exercise);
      if (!updateResult.success) {
        return res.json({ error: updateResult.error });
      }
      return res.json({...userFromDB, ...exercise});
    } catch (e) {
      return res.json({ error: e })
    }
  }
}

module.exports = ExercisesController;