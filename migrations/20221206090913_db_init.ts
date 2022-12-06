import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("user", function (t) {
    return (
      t.increments("id").primary(),
      t.string("name"),
      t.integer("image_resource"),
      t.string("email").notNullable().unique(),
      t.string("password").notNullable(),
      t.timestamps(true, true)
    );
  });

  await knex.schema.createTable("image_resources", function (t) {
    return (
      t.increments("id").primary(),
      t.integer("user_id"),
      t.integer("pg_image"),
      t.integer("s3_image"),
      t.integer("google_cloud_image"),
      t.timestamps(true, true)
    );
  });

  await knex.schema.createTable("pg_image", function (t) {
    return (
      t.increments("id").primary(),
      t.string("file"),
      t.integer("image_resource_id"),
      t.timestamps(true, true)
    );
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("user");
  await knex.schema.dropTable("image_resources");
  await knex.schema.dropTable("pg_image");
}
