import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = ({ id, email, role, signature = "sarahagfuisg1654685" } = {}) => {
    const payload = {
        id, email, role
    };
    return jwt.sign(payload, signature, { expiresIn: "30d" });
};

const verifyToken = ({ token, signature = "sarahagfuisg1654685" } = {}) => {
    const decoded = jwt.verify(token, signature);
    return {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role
    };
};

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ error: 'Email already exists!' });
        }
        const user = await User.create({ username, email, password });
        res.status(201).json({ message: "Signup successfully", user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const token = generateToken({ id: user._id, email: user.email, role: user.role });
        res.status(200).json({ message: "Login success!", token, role: user.role });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
