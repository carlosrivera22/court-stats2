/**
 * @param {import('knex')} knex
 */
exports.up = function (knex) {
  return knex.schema.createTable("playerStats", function (table) {
    table.increments("id").primary();
    table.date("date").notNullable();
    table.integer("points").notNullable();
    table.integer("assists").notNullable();
    table.integer("rebounds").notNullable();
    table.integer("playerId").unsigned().notNullable();
    table.foreign("playerId").references("id").inTable("players");
  });
};

/**
 * @param {import('knex')} knex
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("playerStats");
};
