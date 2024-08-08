const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const register = async (req, res) => {
  const user = req.body;
  try {
    // Kontrollera om e-postadressen redan finns
    const existingUser = await User.getUserByEmail(user.email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const newUser = await User.createUser(user);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.getUserByEmail(email);
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password.' });
  }

  const validPassword = await User.validatePassword(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: 'Invalid email or password.' });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Skicka bara token och användarens id och roll
  res.json({ token, id: user.id, role: user.role });
};

module.exports = { register, login };
