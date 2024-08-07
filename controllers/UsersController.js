const crypto = require('crypto');
const { dbClient } = require('../utils/db');

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    // Input validation
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    try {
      const db = dbClient.db();
      const usersCollection = db.collection('users');

      // Check if email already exists
      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Already exist' });
      }

      // Hash the password using SHA1
      const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');

      // Create the new user
      const result = await usersCollection.insertOne({
        email,
        password: hashedPassword
      });

      // Return the new user with email and id
      res.status(201).json({
        email: result.ops[0].email,
        id: result.ops[0]._id
      });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = UsersController;

