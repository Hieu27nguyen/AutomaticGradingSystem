const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server.js'); // Point to your Express app instance
const User = require('../models/User');

describe('Users Controller', () => {

  beforeAll(async () => {
    // Connect to your MongoDB instance here
    await mongoose.connect('<your_mongo_connection_string>', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterEach(async () => {
    // Clean up the users collection after each test to start fresh
    await User.deleteMany({});
  });

  afterAll(async () => {
    // Disconnect from the database after all tests
    await mongoose.disconnect();
  });

  it('should fetch all users', async () => {
    await User.create({ username: 'testuser', password: 'testpassword', roles: ['user'] });
    const res = await request(app).get('/users');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].username).toBe('testuser');
  });

  it('should create a new user', async () => {
    const res = await request(app).post('/users').send({
      username: 'newuser',
      password: 'newpassword',
      roles: ['user']
    });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('New user newuser created');
  });

  it('should update an existing user', async () => {
    const user = await User.create({ username: 'testuser', password: 'testpassword', roles: ['user'], online: false });
    const res = await request(app).patch('/users').send({
      id: user._id,
      username: 'updateduser',
      roles: ['admin'],
      online: true
    });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('updateduser updated');
  });

  it('should delete a user', async () => {
    const user = await User.create({ username: 'testuser', password: 'testpassword', roles: ['user'] });
    const res = await request(app).delete(`/users/${user._id}`);
    expect(res.status).toBe(200);
    expect(res.body).toBe(`User with ID ${user._id} deleted`);
  });
});