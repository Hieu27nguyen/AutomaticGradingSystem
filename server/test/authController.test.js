const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server.js'); // Ensure you point this to your actual Express app instance
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Main test suite for Auth Controller
describe('Auth Controller', () => {
    // Define a test user to be used throughout the test cases
    const testUser = { username: 'testuser', password: 'testpassword', roles: ['user'] };

    // Before running any tests, connect to the database
    beforeAll(async () => {
        // Connect to your MongoDB instance
        await mongoose.connect('<your_mongo_connection_string>', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    // After each test, clean up the database so every test starts fresh
    afterEach(async () => {
        // Clear out the users collection after each test
        await User.deleteMany({});
    });

    // After all tests have run, disconnect from the database
    afterAll(async () => {
        // Disconnect from the MongoDB instance
        await mongoose.disconnect();
    });

    // Test case for user login functionality
    it('should login the user and provide an access token', async () => {
        // Hash the test user's password and save to the database
        const hashedPassword = await bcrypt.hash(testUser.password, 10);
        await User.create({ ...testUser, password: hashedPassword });

        // Attempt to login with the test user's credentials
        const res = await request(app).post('/auth').send({ username: testUser.username, password: testUser.password });
        
        // Assertions to ensure the login was successful
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('accessToken');
    });

    // Test case to check the system handles invalid credentials properly
    it('should fail login for invalid credentials', async () => {
        const res = await request(app).post('/auth').send({ username: 'invaliduser', password: 'invalidpassword' });
        
        // Assertion to ensure the response status is Unauthorized (401)
        expect(res.status).toBe(401);
    });

    // Test case to ensure the refresh token functionality works correctly
    it('should refresh the token', async () => {
        const hashedPassword = await bcrypt.hash(testUser.password, 10);
        await User.create({ ...testUser, password: hashedPassword });
        
        // First, login to get a refresh token
        const loginRes = await request(app).post('/auth').send({ username: testUser.username, password: testUser.password });
        const refreshToken = loginRes.headers['set-cookie'][0].split(';')[0].split('=')[1];
        
        // Use the refresh token to get a new access token
        const res = await request(app).get('/auth/refresh').set('Cookie', [`jwt=${refreshToken}`]);
        
        // Assertions to ensure the token refresh was successful
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('accessToken');
    });

    // Test case for user logout functionality
    it('should logout the user and clear the refresh token', async () => {
        const hashedPassword = await bcrypt.hash(testUser.password, 10);
        await User.create({ ...testUser, password: hashedPassword });

        // First, login to get a refresh token
        const loginRes = await request(app).post('/auth').send({ username: testUser.username, password: testUser.password });

        // Use the refresh token to log out
        const res = await request(app).post('/auth/logout').set('Cookie', loginRes.headers['set-cookie']);
        
        // Assertions to ensure the logout was successful and the cookie was cleared
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Cookie cleared');
    });
});
