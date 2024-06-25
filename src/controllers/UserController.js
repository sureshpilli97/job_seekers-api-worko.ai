const express = require('express');
const router = express.Router();
const UserService = require('../services/UserService');
const UserDTO = require('../dto/UserDTO');
const { validatePost, validatePut, validateDelete } = require('../validators/UserValidator');

router.get('/', async (req, res) => {
    try {
        const users = await UserService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).send('Internal server error');
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const user = await UserService.getUser(req.params.userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).send('Internal server error');
    }
});

router.post('/', async (req, res) => {
    try {
        const userDTO = new UserDTO(req.body.email, req.body.name, req.body.age, req.body.city, req.body.zipCode);
        const user = await UserService.createUser(userDTO);
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal server error');
    }
});

router.patch('/:userId', async (req, res) => {
    const { error } = validatePost({ id: req.params.userId, ...req.body });
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    try {
        const userDTO = new UserDTO(req.body.email, req.body.name, req.body.age, req.body.city, req.body.zipCode);
        await UserService.updateUser(req.params.userId, userDTO);
        res.status(204).send();
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Internal server error');
    }
});

router.put('/:userId', async (req, res) => {
    const { error } = validatePut({ id: req.params.userId, ...req.body });
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    try {
        const userDTO = new UserDTO(req.body.email, req.body.name, req.body.age, req.body.city, req.body.zipCode);
        await UserService.updateUser(req.params.userId, userDTO);
        res.status(204).send();
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Internal server error');
    }
});

router.delete('/:userId', async (req, res) => {
    const { error } = validateDelete({ id: req.params.userId });
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    try {
        await UserService.deleteUser(req.params.userId);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
