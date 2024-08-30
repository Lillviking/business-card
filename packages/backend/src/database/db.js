const knex = require('knex');
const config = require('../../knexfile');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});

const environment = process.env.NODE_ENV || 'development';
const connection = knex(config[environment]);


module.exports = connection;

