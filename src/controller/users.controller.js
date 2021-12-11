const UsersDAO = require('../dao/usersDAO');

class UsersController {
  static async createUser(req, res) {
    try {
      const usernameFromBody = req.body.username;
      if (!usernameFromBody) {
        return res.json({ error: 'invalid username' });
      }
      const userData = await UsersDAO.getUserByUsername(usernameFromBody);
      if (userData) {
        return res.json({ ...userData });
      }
      const insertResult = await UsersDAO.createUser(usernameFromBody);
      if (!insertResult.success) {
        return res.json({ error: insertResult.error });
      }
      const userFromDB = await UsersDAO.getUserByUsername(usernameFromBody);
      if (!userFromDB) {
        return res.json({ error: 'internal error' });
      }
      return res.json({ ...userFromDB });
    } catch (e) {
      return res.json({ error: e })
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await UsersDAO.getUsers();
      return res.json(users)
    } catch (e) {
      return res.json({ error: e })
    }
  }
}

module.exports = UsersController;