const { User } = require('../models/user.model');

/**
 * Data Access Object for User operations.
 */
class UserDAO {
    async createUser(userData) {
        const user = new User(userData);
        return await user.save();
    }

    async getUserById(userId) {
        return await User.findById(userId);
    }

    async getUserByEmail(email) {
        return await User.findOne({ email });
    }

    async updateUser(userId, updateData) {
        return await User.findByIdAndUpdate(userId, updateData, { new: true });
    }

    async deleteUser(userId) {
        return await User.findByIdAndDelete(userId);
    }

    async getAllUsers(filter = {}) {
        return await User.find(filter);
    }
}

module.exports = new UserDAO();