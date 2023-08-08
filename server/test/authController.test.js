const authController = require('./authController');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const request = require('supertest');
const express = require('express');
require('dotenv').config();

jest.mock('../models/User');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

const app = express();
app.use(express.json());
app.post('/auth', authController.login);
app.get('/auth/refresh', authController.refresh);
app.post('/auth/logout', authController.logout);

describe('Auth Controller', () => {
  it('should handle login', async () => {
    const mockUser = { username: 'test', password: 'test', roles: ['user'], active: true };
    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('token');

    const res = await request(app).post('/auth').send({ username: 'test', password: 'test' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('accessToken');
  });

  it('should handle refresh token', async () => {
    const mockUser = { username: 'test', roles: ['user'] };
    jwt.verify.mockImplementation((token, secret, cb) => cb(null, { username: 'test' }));
    User.findOne.mockResolvedValue(mockUser);
    jwt.sign.mockReturnValue('token');

    const res = await request(app)
      .get('/auth/refresh')
      .set('Cookie', ['jwt=refresh-token']);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('accessToken');
  });

  it('should handle logout', async () => {
    const res = await request(app)
      .post('/auth/logout')
      .set('Cookie', ['jwt=refresh-token']);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Cookie cleared');
  });
});
