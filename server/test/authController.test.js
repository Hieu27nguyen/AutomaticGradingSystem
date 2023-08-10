// Import the authController module.
const authController = require('./authController');
// Import the User model.
const User = require('../models/User');
// Import bcrypt for password hashing.
const bcrypt = require('bcrypt');
// Import jwt for JSON Web Token operations.
const jwt = require('jsonwebtoken');
// Import supertest for HTTP assertions.
const request = require('supertest');
// Import express for creating the web server.
const express = require('express');
// Import environment variable configuration.
require('dotenv').config();

// Mock the User model to avoid actual database calls.
jest.mock('../models/User');
// Mock bcrypt to avoid actual hashing.
jest.mock('bcrypt');
// Mock jwt to avoid actual token operations.
jest.mock('jsonwebtoken');

// Initialize the express app.
const app = express();
// Use express.json middleware to parse JSON payloads.
app.use(express.json());
// Set up login, refresh, and logout routes with respective controllers.
app.post('/auth', authController.login);
app.get('/auth/refresh', authController.refresh);
app.post('/auth/logout', authController.logout);

// Describe the test suite for Auth Controller.
describe('Auth Controller', () => {
  // Test case for login functionality.
  it('should handle login', async () => {
    // Mock a user to simulate a database find.
    const mockUser = { username: 'test', password: 'test', roles: ['user'], active: true };
    // Mock the findOne function to return the mock user.
    User.findOne.mockResolvedValue(mockUser);
    // Mock bcrypt's compare function to return true (password matches).
    bcrypt.compare.mockResolvedValue(true);
    // Mock jwt's sign function to return a token.
    jwt.sign.mockReturnValue('token');

    // Make a POST request to login with mock credentials and assert the response.
    const res = await request(app).post('/auth').send({ username: 'test', password: 'test' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('accessToken');
  });

  // Test case for refresh token functionality.
  it('should handle refresh token', async () => {
    // Mock a user to simulate a database find.
    const mockUser = { username: 'test', roles: ['user'] };
    // Mock jwt's verify function to simulate successful token verification.
    jwt.verify.mockImplementation((token, secret, cb) => cb(null, { username: 'test' }));
    // Mock the findOne function to return the mock user.
    User.findOne.mockResolvedValue(mockUser);
    // Mock jwt's sign function to return a new token.
    jwt.sign.mockReturnValue('token');

    // Make a GET request to refresh the token and assert the response.
    const res = await request(app)
      .get('/auth/refresh')
      .set('Cookie', ['jwt=refresh-token']);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('accessToken');
  });

  // Test case for logout functionality.
  it('should handle logout', async () => {
    // Make a POST request to logout and assert the response.
    const res = await request(app)
      .post('/auth/logout')
      .set('Cookie', ['jwt=refresh-token']);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Cookie cleared');
  });
});

