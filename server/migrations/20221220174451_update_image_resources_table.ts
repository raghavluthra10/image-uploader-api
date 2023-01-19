import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("image_resources", function (t) {
    t.dropColumn("s3_image");
    t.dropColumn("google_cloud_image");
    t.string("firebase_public_url");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("image_resources", function (t) {
    t.dropColumn("firebase_public_url");
  });
}
