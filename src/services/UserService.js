const UserDAO = require('../dao/UserDAO');
const User = require('../models/User');

class UserService {
    static async createUser(userDTO) {
        const user = new User(null, userDTO.email, userDTO.name, userDTO.age, userDTO.city, userDTO.zipCode);
        return await UserDAO.createUser(user);
    }

    static async getUser(userId) {
        return await UserDAO.getUser(userId);
    }

    static async updateUser(userId, userDTO) {
        const user = new User(null, userDTO.email, userDTO.name, userDTO.age, userDTO.city, userDTO.zipCode);
        return await UserDAO.updateUser(userId, user);
    }

    static async deleteUser(userId) {
        return await UserDAO.deleteUser(userId);
    }

    static async getUsers() {
        return await UserDAO.getUsers();
    }
}

module.exports = UserService;
