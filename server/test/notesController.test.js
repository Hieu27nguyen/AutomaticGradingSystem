const noteController = require('./noteController');
const Note = require('../models/Note');
const User = require('../models/User');
const request = require('supertest');
const express = require('express');

jest.mock('../models/Note');
jest.mock('../models/User');

const app = express();
app.use(express.json());
app.get('/notes', noteController.getAllNotes);
app.post('/notes', noteController.createNewNote);
app.patch('/notes', noteController.updateNote);
app.delete('/notes', noteController.deleteNote);

describe('Note Controller', () => {
  it('should handle getting all notes', async () => {
    const mockUser = { _id: 'user1', username: 'test' };
    const mockNotes = [{ _id: 'note1', user: 'user1', title: 'note title', text: 'note text' }];
    Note.find.mockResolvedValue(mockNotes);
    User.findById.mockResolvedValue(mockUser);

    const res = await request(app).get('/notes');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty('username', 'test');
  });

  it('should handle creating new note', async () => {
    const mockNote = { user: 'user1', title: 'note title', text: 'note text' };
    Note.findOne.mockResolvedValue(null);
    Note.create.mockResolvedValue({ _id: 'note1', ...mockNote });

    const res = await request(app).post('/notes').send(mockNote);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'New note created');
  });

  it('should handle updating note', async () => {
    const mockNote = { _id: 'note1', user: 'user1', title: 'note title', text: 'note text', completed: false };
    Note.findById.mockResolvedValue({ ...mockNote, save: jest.fn() });
    Note.findOne.mockResolvedValue(null);

    const res = await request(app).patch('/notes').send({ id: 'note1', ...mockNote, completed: true });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual('\'note title\' updated');
  });

  it('should handle deleting note', async () => {
    const mockNote = { _id: 'note1', title: 'note title', deleteOne: jest.fn().mockResolvedValue({ title: 'note title', _id: 'note1' }) };
    Note.findById.mockResolvedValue(mockNote);

    const res = await request(app).delete('/notes').send({ id: 'note1' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual('Note \'note title\' with ID note1 deleted');
  });
});