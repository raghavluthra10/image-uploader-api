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
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    host: process.env.PGHOST,
  },
};

const production: Connection = {
  client: "pg",
  connection: {
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    host: process.env.PGHOST,
  },
  pool: {
    min: 2,
    max: 10,
  },
};

export { development, production };
