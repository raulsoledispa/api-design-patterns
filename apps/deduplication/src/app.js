import Fastify from "fastify";
import mongoClient from "@fastify/mongodb";
import userRoutes from "./routes/index.js";
import env  from "@fastify/env";
import redisClient from "@fastify/redis";


const schema = {
  type: "object",
  required: ["URL_DB"],
  properties: {
    URL_DB: {
      type: "string"
    },
    CACHE_HOST: {
      type: "string"
    },
    CACHE_PORT: {
      type: "integer"
    },
    CACHE_PASSWORD: {
      type: "string"
    }
  }
}


export default async function Build() {
  const app = Fastify({
    logger: true,
  });


  await app.register(env, {
    confKey: 'config',
    schema: schema,
    dotenv: true
  })

  app.register(mongoClient, {
    forceClose: true,
    url: app.config.URL_DB,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app.register(redisClient, {
    host: app.config.CACHE_HOST,
    password: app.config.CACHE_PASSWORD,
    port: app.config.CACHE_PORT,
    family: 4
  })

  await app.register(userRoutes);

  return app;
}
