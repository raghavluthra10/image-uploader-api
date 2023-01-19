import Knex from "knex";
import { development } from "../knexfile";

const database = Knex(development);

export { database };
