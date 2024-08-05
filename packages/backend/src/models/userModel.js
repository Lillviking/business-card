const db = require('../database/db');

const createUser = async (user) => {
  console.log('Creating user:', user);
  try {
    const [id] = await db('users').insert(user).returning('id');
    console.log('User created with ID:', id);
    return { id, ...user };
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

const updateUser = async (id, user) => {
  await db('users').where({ id }).update(user);
  return { id, ...user };
};

const deleteUser = async (id) => {
  return db('users').where({ id }).del();
};

module.exports = { createUser, getUsers, getUserById, getUserByEmail, updateUser, deleteUser };
