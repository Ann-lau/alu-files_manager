const { MongoClient } = require('mongodb');
require('dotenv').config(); // Load environment variables

class DBClient {
  constructor() {
    // Retrieve configuration from environment variables with defaults
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    // Create MongoDB URI
    const uri = `mongodb://${host}:${port}/${database}`;

    // Create a new MongoClient
    this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    // Connect to MongoDB
    this.client.connect(err => {
      if (err) {
        console.error('MongoDB connection error:', err);
      } else {
        console.log('Connected to MongoDB');
      }
    });
  }

  async isAlive() {
    try {
      // Check connection to the MongoDB server
      await this.client.db().command({ ping: 1 });
      return true;
    } catch (err) {
      console.error('MongoDB connection error:', err);
      return false;
    }
  }

  async nbUsers() {
    try {
      // Count the number of documents in the 'users' collection
      const usersCollection = this.client.db().collection('users');
      return await usersCollection.countDocuments();
    } catch (err) {
      console.error('Error counting users:', err);
      return 0;
    }
  }

  async nbFiles() {
    try {
      // Count the number of documents in the 'files' collection
      const filesCollection = this.client.db().collection('files');
      return await filesCollection.countDocuments();
    } catch (err) {
      console.error('Error counting files:', err);
      return 0;
    }
  }
}

// Create and export an instance of DBClient
const dbClient = new DBClient();
module.exports = { dbClient };


