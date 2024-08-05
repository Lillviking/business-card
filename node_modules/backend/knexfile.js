require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});

  module.exports = {

    development: {
      client: 'sqlite3',
      connection: {
        filename: process.env.DATABASE_FILENAME
      },
      useNullAsDefault: true
    },  
    production: {
      client: 'sqlite3',
      connection: {
        filename: process.env.DATABASE_FILENAME
      },
      useNullAsDefault: true
    }
  
  };