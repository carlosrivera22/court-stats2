import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // Deletes the 'age' column from the 'players' table
  return knex.schema.table("players", (table) => {
    table.dropColumn("age");
  });
}

export async function down(knex: Knex): Promise<void> {
  // Adds the 'age' column back to the 'players' table
  return knex.schema.table("players", (table) => {
    table.integer("age").nullable();
  });
}
