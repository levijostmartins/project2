const User = require('../models/User');
const jwt = require('jsonwebtoken');


exports.getAll = async (req, res, next) => {
try {
const users = await User.find().select('-__v');
res.json(users);
} catch (err) { next(err); }
};


exports.getProfile = async (req, res) => {
if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
res.json(req.user);
};


exports.issueJwt = (req, res) => {
if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
const payload = { id: req.user._id, roles: req.user.roles };
const token = jwt.sign(payload, process.env.JWT_SECRET || 'jwtsecret', { expiresIn: '7d' });
res.json({ token, user: req.user });
};