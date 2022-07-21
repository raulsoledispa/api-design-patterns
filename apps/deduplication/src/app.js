import Fastify from "fastify";
import mongoClient from "@fastify/mongodb";
import env from "@fastify/env";
import userRoutes from "./routes/index.js";

const schema = {
  type: "object",
  required: ["URL_DB"],
  properties: {
    URL_DB: {
      type: "string",
    },
    CACHE_HOST: {
      type: "string",
    },
    CACHE_PORT: {
      type: "integer",
    },
  },
};

export default async function Build() {
  const app = Fastify({
    logger: true,
  });

  await app.register(env, {
    confKey: "config",
    schema,
    dotenv: true,
  });

  app.register(mongoClient, {
    forceClose: true,
    url: app.config.URL_DB,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app.register(import("@fastify/redis"), {
    host: app.config.CACHE_HOST,
    port: app.config.CACHE_PORT,
    family: 4,
  });

  app.register(userRoutes);

  return app;
}
