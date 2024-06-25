const db = require('../config/firebase');
const User = require('../models/User');
const UserValidator = require('../validators/UserValidator');

class UserDAO {
    static async createUser(user) {
        try {
            const userRef = db.collection('users').doc();
            user.id = userRef.id;
            const { error } = UserValidator.validatePost(user);
            if (error) {
                throw new Error(error.details[0].message);
            }
            const userData = {
                email: user.email,
                name: user.name,
                age: user.age,
                city: user.city,
                zipCode: user.zipCode
            };

            await userRef.set(userData);
            return user;
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Failed to create user');
        }
    }

    static async getUser(userId) {
        try {
            const userDoc = await db.collection('users').doc(userId).get();
            if (!userDoc.exists) {
                return null;
            }

            const userData = userDoc.data();
            return new User(userId, userData.email, userData.name, userData.age, userData.city, userData.zipCode);
        } catch (error) {
            console.error('Error getting user:', error);
            throw new Error('Failed to get user');
        }
    }

    static async updateUser(userId, user) {
        try {
            const userData = {
                email: user.email,
                name: user.name,
                age: user.age,
                city: user.city,
                zipCode: user.zipCode
            };

            await db.collection('users').doc(userId).update(userData);
        } catch (error) {
            console.error('Error updating user:', error);
            throw new Error('Failed to update user');
        }
    }

    static async deleteUser(userId) {
        try {
            await db.collection('users').doc(userId).delete();
        } catch (error) {
            console.error('Error deleting user:', error);
            throw new Error('Failed to delete user');
        }
    }

    static async getUsers() {
        try {
            const usersQuerySnapshot = await db.collection('users').get();
            const users = [];
            usersQuerySnapshot.forEach(userDoc => {
                const userData = userDoc.data();
                const user = new User(userDoc.id, userData.email, userData.name, userData.age, userData.city, userData.zipCode);
                users.push(user);
            });
            return users;
        } catch (error) {
            console.error('Error getting users:', error);
            throw new Error('Failed to get users');
        }
    }
}

module.exports = UserDAO;
