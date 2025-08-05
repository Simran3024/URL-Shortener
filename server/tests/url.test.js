// server/tests/url.test.js
const request = require('supertest');
const app = require('../index'); // Ensure your app is exported from index.js
const mongoose = require('mongoose');
const Url = require('../models/Url');

describe('URL Shortener API', () => {
  // Connect to a test database before running tests
  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/test_database`;
    await mongoose.connect(url, { useNewUrlParser: true });
  });

  // Clean up the database after each test
  afterEach(async () => {
    await Url.deleteMany();
  });

  // Disconnect from the database after all tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('POST /shorten', () => {
    it('should create a new short URL', async () => {
      const res = await request(app)
        .post('/shorten')
        .send({ longUrl: 'https://www.google.com' });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('shortCode');
      expect(res.body.longUrl).toBe('https://www.google.com');
    });

    it('should return a 400 error for an invalid URL', async () => {
      const res = await request(app)
        .post('/shorten')
        .send({ longUrl: 'not-a-valid-url' });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', 'Please provide a valid URL.');
    });
  });
});