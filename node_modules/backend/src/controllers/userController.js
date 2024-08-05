const User = require('../models/userModel');

// Skapa en ny användare
exports.createUser = async (req, res) => {
  try {
    const user = req.body;
    console.log('Received request to create user:', user);
    
    // Kontrollera om e-postadressen redan finns
    const existingUser = await User.getUserByEmail(user.email);
    if (existingUser) {
      console.log('Email already exists:', user.email);
      return res.status(400).json({ message: 'Email already exists' });
    }
    
    const newUser = await User.createUser(user);
    console.log('New user created successfully:', newUser);
    res.status(201).json({ message: 'New user created successfully', user: newUser });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(400).json({ message: err.message });
  }
};

// Hämta alla användare
exports.getUsers = async (req, res) => {
  try {
    const users = await User.getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Hämta en användare med ID
exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Uppdatera en användare med ID
exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.body;
    const updatedUser = await User.updateUser(id, user);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Ta bort en användare med ID
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.deleteUser(id);
    res.json({ message: 'User removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
