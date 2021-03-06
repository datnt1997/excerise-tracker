const { ObjectId } = require("bson");

let users;

class UsersDAO {
  static async injectDB(conn) {
    if (users) {
      return;
    }
    try {
      users = await conn.db(process.env.DB_NAME).collection('users');
    } catch (e) {
      console.error(`Unable to establish collection handles in usersDAO: ${e}`);
    }
  }

  static async getUserByID(id) {
    return await users.findOne({ _id: ObjectId(id) }, { projection: { _id: 1, username: 1 } });
  }

  static async getUserByUsername(username) {
    return await users.findOne({ username }, { projection: { _id: 1, username: 1 } });
  }

  static async getUsers(condition = {}) {
    let cursor;
    try {
      cursor = await users
        .find({ ...condition })
        .project({ _id: 1, username: 1 });
    } catch (e) {
      return [];
    }
    return cursor.toArray();
  }

  static async createUser(username) {
    try {
      await users.insertOne({ username })
      return { success: true }
    } catch (e) {
      console.error(`Error occurred while adding new user, ${e}.`)
      return { error: e }
    }
  }
}

module.exports = UsersDAO;