import { Knex } from "knex";
import { User, ImageResources, PgImage } from "../interfaces/databaseTables";

export async function seed(knex: Knex): Promise<void> {
  await knex<User>("user").insert([
    {
      id: 1,
      name: "raghav",
      image_resource: 1,
      email: "raghav@test.com",
      password: "raghav",
    },
    {
      id: 2,
      name: "aron",
      image_resource: 2,
      email: "aron@test.com",
      password: "aron",
    },
  ]);

  await knex<ImageResources>("image_resources").insert([
    {
      id: 1,
      user_id: 1,
      s3_image: null,
      google_cloud_image: null,
    },
  ]);
}
