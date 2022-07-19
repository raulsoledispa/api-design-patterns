import Fastify from "fastify";
import mongoClient from "@fastify/mongodb";
import userRoutes from "./routes/index.js";
import env  from "@fastify/env";

const schema = {
  type: "object",
  required: ["URL_DB"],
  properties: {
    URL_DB: {
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

  app.register(userRoutes);

  return app;
}
