import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("players", (table) => {
    table.dropColumn("age"); // Ensure this line is here if you're also removing the 'age' column.
    table.string("highlightsUrl").nullable(); // Adds a 'highlightsUrl' column that can contain null values.
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("players", (table) => {
    table.integer("age").nullable(); // Adds the 'age' column back if needed.
    table.dropColumn("highlightsUrl"); // Removes the 'highlightsUrl' column.
  });
}
