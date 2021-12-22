const { ObjectId } = require("bson");

let exercises;

class ExercisesDAO {
  static async injectDB(conn) {
    if (exercises) {
      return;
    }
    try {
      exercises = await conn.db(process.env.DB_NAME).collection('exercises');
    } catch (e) {
      console.error(`Unable to establish collection handles in exercisesDAO: ${e}`);
    }
  }

  static async createExercise(id, exercise) {
    try {
      await exercises.insertOne({user_id: id, ...exercise});
      return { success: true }
    } catch (e) {
      console.error(`Error occurred while adding new exercise, ${e}.`)
      return { error: e }
    }
  }

  static async getExercises(condition = {}, limit = 0) {
    let cursor;
    try {
      cursor = await exercises
        .find({ ...condition })
        .limit(limit);
    } catch (e) {
      return [];
    }
    return cursor.toArray();
  }
}

module.exports = ExercisesDAO;

