/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
// seeds/01_add_admin.js

const bcrypt = require('bcrypt');
const generateRandomId = require('../src/utils/randomId');

exports.seed = async function(knex) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('adminpassword', salt);

  // Rensa användartabellen
  await knex('users').del();

  // Lägg till admin-användare
  await knex('users').insert({
    id: generateRandomId(10),
    name: 'Frida',
    email: 'frida_ulfves@hotmail.com',
    password: hashedPassword,
    role: 'admin',
    avatar: 'https://via.placeholder.com/140'
  });
};
