const request = require('supertest');
const chai = require('chai');
const { expect } = chai;
const app = require('../path'); // Path to your Express app file

describe('Submission Routes', () => {
    let adminToken, contestantToken; // Assuming JWT or some sort of authentication
    let createdSubmissionId;

    before(async () => {
        // Login as admin and contestant to get tokens
        
    });

    describe('POST /submissions', () => {
        it('should create a new submission', async () => {
            const response = await request(app)
                .post('/submissions')
                .set('Authorization', `Bearer ${contestantToken}`)
                .send({ 
                    user: "mockUserId",
                    problem: "mockProblemId",
                    code: "print('Hello World')",
                });

            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('data');
            createdSubmissionId = response.body.data._id; // Store ID for further tests
        });
    });

    describe('GET /submissions/:submissionId', () => {
        it('should fetch a submission by ID', async () => {
            const response = await request(app)
                .get(`/submissions/${createdSubmissionId}`)
                .set('Authorization', `Bearer ${contestantToken}`);

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('_id').equal(createdSubmissionId);
        });
    });

    describe('PUT /submissions/:submissionId', () => {
        it('should update a submission status', async () => {
            const response = await request(app)
                .put(`/submissions/${createdSubmissionId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ status: 'Accepted' });

            expect(response.status).to.equal(200);
            expect(response.body.data).to.have.property('status').equal('Accepted');
        });
    });

    describe('DELETE /submissions/:submissionId', () => {
        it('should delete a submission by ID', async () => {
            const response = await request(app)
                .delete(`/submissions/${createdSubmissionId}`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('message').equal('Submission deleted successfully');
        });
    });
});
