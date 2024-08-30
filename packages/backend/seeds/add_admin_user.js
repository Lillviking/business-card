/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
// seeds/01_add_admin.js

const bcrypt = require('bcrypt');
const generateRandomId = require('../src/utils/randomId');
const axios = require('axios');

exports.seed = async function(knex) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('adminpassword', salt);

  // Rensa användartabellen
  await knex('users').del();

  const imageUrl = 'https://via.placeholder.com/140'
  const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  const imageBuffer = Buffer.from(response.data, 'binary');

  // Lägg till admin-användare
  await knex('users').insert({
    id: generateRandomId(10),
    name: 'Frida',
    email: 'frida_ulfves@hotmail.com',
    phone: '+46705405094',
    employer: 'Bolagsverket',
    password: hashedPassword,
    role: 'admin',
    avatar: imageBuffer
  });
};
