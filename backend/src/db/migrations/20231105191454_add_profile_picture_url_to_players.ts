import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("players", (table) => {
    // Add a new column 'profilePictureUrl' to the 'players' table
    table.string("profilePictureUrl").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("players", (table) => {
    // Remove the 'profilePictureUrl' column from the 'players' table
    table.dropColumn("profilePictureUrl");
  });
}
