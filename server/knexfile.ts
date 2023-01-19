/**
 * @type { Object.<string, import("knex").Knex.Config> }
 *
 */
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

interface Connection {
  client: string;
  connection: {
    database: string | undefined;
    user: string | undefined;
    password: string | undefined;
    port: number | any;
    host: string | undefined;
  };
  pool?: {
    min: number | undefined;
    max: number | undefined;
  };
}

const development: Connection = {
  client: "pg",
  connection: {
    database: process.env.database,
    user: process.env.user,
    password: process.env.password,
    port: process.env.port,
    host: process.env.host,
  },
};

const production: Connection = {
  client: "pg",
  connection: {
    database: process.env.database,
    user: process.env.user,
    password: process.env.password,
    port: process.env.port,
    host: process.env.host,
  },
  pool: {
    min: 2,
    max: 10,
  },
};

export { development, production };
