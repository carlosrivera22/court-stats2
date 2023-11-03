import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("player", (table) => {
    table.increments("id").primary();
    table.string("firstName", 255).notNullable();
    table.string("lastName", 255).notNullable();
    table.integer("age").nullable();
    table.date("birthDate").nullable();
    table.string("homeTown").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("player");
}
