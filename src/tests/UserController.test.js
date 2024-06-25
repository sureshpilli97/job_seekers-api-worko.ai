const request = require('supertest');
const express = require('express');
const UserController = require('../controllers/UserController');
const UserService = require('../services/UserService');

const app = express();
app.use(express.json());
app.use('/worko/user', UserController);

jest.mock('../services/UserService', () => ({
    createUser: jest.fn((user) => Promise.resolve({ id: '1', ...user })),
    getUsers: jest.fn(() => Promise.resolve([{ id: '1', name: 'Suresh Pilli', email: 'suresh123@gmail.com', age: 20, city: 'Rajahmundry', zipCode: '54321' }])),
    getUser: jest.fn((userId) => {
        if (userId === '2') {
            return Promise.resolve({ id: '2', name: 'Surya Leo', email: 'surya@gmail.com', age: 21, city: 'Bangalore', zipCode: '12345' });
        } else {
            return Promise.resolve({ id: '1', name: 'Suresh Pilli', email: 'suresh123@gmail.com', age: 20, city: 'Rajahmundry', zipCode: '54321' });
        }
    }),
    updateUser: jest.fn((userId, user) => Promise.resolve({ id: userId, ...user })),
    deleteUser: jest.fn((userId) => Promise.resolve({ id: userId })),
}));

describe('User Controller', () => {
    it('get all users', async () => {
        const res = await request(app).get('/worko/user');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0].id).toEqual('1');
    });

    it('get a user by id', async () => {
        const res = await request(app).get(`/worko/user/1`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toEqual('1');
        expect(res.body.name).toEqual('Suresh Pilli');
    });

    it('create a user', async () => {
        const user = { email: 'suresh123@gmail.com', name: 'Suresh Pilli', age: 20, city: 'Rajahmundry', zipCode: '54321' };
        const res = await request(app).post('/worko/user').send(user);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toMatchObject(user);
    });

    it('update a user', async () => {
        const user = { name: 'Surya Leo', email: 'surya@gmail.com', age: 21, city: 'Bangalore', zipCode: '12345' };
        const res = await request(app).put('/worko/user/2').send(user);
        expect(res.statusCode).toEqual(204);
        const updatedUser = await UserService.getUser('2');
        expect(updatedUser).toMatchObject({ id: '2', ...user });
    });

    it('delete a user', async () => {
        const res = await request(app).delete('/worko/user/1');
        expect(res.statusCode).toEqual(204);
    });
});
