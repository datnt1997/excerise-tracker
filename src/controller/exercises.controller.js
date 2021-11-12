const UsersDAO = require('../dao/usersDAO');

class ExercisesController {
  static async createExercise(req, res) {
    try {
      const descriptionFromBody = req.body.description;
      const 
      if (!usernameFromBody) {
        return res.json({ error: 'invalid username' });
      }
      const userData = await UsersDAO.getUserByUsername(usernameFromBody);
      if (userData) {
        return res.json({ username: userData.username, _id: userData._id, });
      }
      const insertResult = await UsersDAO.createUser(usernameFromBody);
      if (!insertResult.success) {
        return res.json({ error: insertResult.error });
      }
      const userFromDB = await UsersDAO.getUserByUsername(usernameFromBody);
      if (!userFromDB) {
        return res.json({ error: 'internal error' });
      }
      return res.json({ username: userFromDB.username, _id: userFromDB._id, });
    } catch (e) {
      return res.json({ error: e })
    }
  }
}