import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("image_resources", function (t) {
    t.string("file_reference");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("image_resources", function (t) {
    t.dropColumn("file_reference");
  });
}
