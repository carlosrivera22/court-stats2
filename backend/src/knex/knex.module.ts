// knex.module.ts
import { Module } from "@nestjs/common";
import * as Knex from "knex";
import { Model } from "objection";
import knexConfig from "../../knexfile";

@Module({
  providers: [
    {
      provide: "KnexConnection",
      useFactory: async () => {
        const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);
        Model.knex(knex); // If using Objection.js with Knex
        return knex;
      },
    },
  ],
  exports: ["KnexConnection"],
})
export class KnexModule {}
