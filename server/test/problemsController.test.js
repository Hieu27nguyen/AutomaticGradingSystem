const request = require('supertest');
const express = require('express');
const problemRoutes = require('../server.js'); 

// Mock the required imports for testing.
jest.mock('../models/Problem');

const app = express();
app.use(express.json());
app.use('/problems', problemRoutes); // Assuming problem routes are being used as middleware.

describe('Problem Routes', () => {
  // 1. Create a problem.
  it('should create a new problem', async () => {
    // Mock user role to be Authorized.
    

    // Perform the post request to create a problem.
    const response = await request(app)
      .post('/problems')
      .send({ name: 'Sample Problem', description: 'This is a sample problem.' });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('name', 'Sample Problem');
  });

  // 2. Get a problem by its ID.
  it('should retrieve a problem by ID', async () => {
    // Mock findById function to return a sample problem.
    

    const response = await request(app).get('/problems/sample_id');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name', 'Sample Problem');
  });

  // 3. Update a problem.
  it('should update a problem', async () => {
    // Mock user role to be Authorized and mock findByIdAndUpdate function.
   

    const response = await request(app)
      .put('/problems/sample_id')
      .send({ name: 'Updated Problem', description: 'This is an updated description.' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name', 'Updated Problem');
  });

  // 4. Delete a problem.
  it('should delete a problem', async () => {
    // Mock user role to be Authorized and mock findByIdAndDelete function.

    const response = await request(app).delete('/problems/sample_id');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Problem deleted successfully');
  });
});
