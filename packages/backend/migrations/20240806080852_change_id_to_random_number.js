const generateRandomId = require("../src/utils/randomId");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  // Lägg till ny kolumn som tillåter NULL-värden
  await knex.schema.alterTable('users', function(table) {
    table.string('new_id');
  });

  // Uppdatera alla befintliga rader med slumpmässiga ID:n
  const users = await knex('users').select('*');
  for (const user of users) {
    const newId = generateRandomId(10);
    await knex('users')
      .where({ id: user.id })
      .update({ new_id: newId });
  }

  // Byt namn på den nya kolumnen och gör den till primärnyckel
  await knex.schema.alterTable('users', function(table) {
    table.renameColumn('new_id', 'temp_id');
  });

  // Ta bort den gamla id-kolumnen
  await knex.schema.alterTable('users', function(table) {
    table.dropColumn('id');
  });

  // Byt namn på temp_id-kolumnen till id och sätt den som primärnyckel
  await knex.schema.alterTable('users', function(table) {
    table.renameColumn('temp_id', 'id');
    table.string('id').notNullable().primary().alter();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.alterTable('users', function(table) {
    table.dropColumn('id');
  });
  await knex.schema.alterTable('users', function(table) {
    table.increments('id').primary();
  });
};
