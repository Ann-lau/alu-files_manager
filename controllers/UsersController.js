const crypto = require('crypto');
const { dbClient } = require('../utils/db'); // Import the DB client instance

class UsersController {
  // Method to handle POST requests for creating a new user
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    try {
      const usersCollection = dbClient.client.db().collection('users');

      // Check if the email already exists
      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Already exist' });
      }

      // Hash the password using SHA1
      const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');

      // Create a new user
      const result = await usersCollection.insertOne({ email, password: hashedPassword });

      // Respond with the new user's email and id
      return res.status(201).json({
        id: result.insertedId,
        email: email
      });
    } catch (err) {
      console.error('Error creating user:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = UsersController;

