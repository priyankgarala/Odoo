const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust path as needed

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const authServices = {
    async register({ username, password }) {
        const existingUser = await User.findOne({ username });
        if (existingUser) throw new Error('User already exists');
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        return { id: user._id, username: user.username };
    },

    async login({ username, password }) {
        const user = await User.findOne({ username });
        if (!user) throw new Error('Invalid credentials');
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new Error('Invalid credentials');
        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        return { token, user: { id: user._id, username: user.username } };
    },

    verifyToken(token) {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (err) {
            throw new Error('Invalid token');
        }
    }
};

module.exports = authServices;