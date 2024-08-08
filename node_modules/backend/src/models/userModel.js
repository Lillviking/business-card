const db = require('../database/db');
const generateRandomId = require('../utils/randomId');
const bcrypt = require('bcrypt');

const createUser = async (user) => {
  console.log('Creating user:', user);
  try {
    const id = generateRandomId(10);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    const [newUser] = await db('users').insert({ id, ...user }).returning('*');
    console.log('User created with ID:', id);
    return newUser;
  } catch (err) {
    console.error('Error creating user:', err);
    throw err;
  }
};

const getUsers = async () => {
  return db('users').select('*');
};

const getUserById = async (id) => {
  return db('users').where({ id }).first();
};

const getUserByEmail = async (email) => {
  return db('users').where({ email }).first();
};

const validatePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const updateUser = async (id, user) => {
  await db('users').where({ id }).update(user);
  return { id, ...user };
};

const deleteUser = async (id) => {
  return db('users').where({ id }).del();
};

module.exports = { createUser, getUsers, getUserById, getUserByEmail, updateUser, deleteUser, validatePassword };
