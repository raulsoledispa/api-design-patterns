import Fastify from "fastify";
import mongoClient from "@fastify/mongodb";
import userRoutes from "./routes/index.js";

export default function Build() {
  const app = Fastify({
    logger: true,
  });

  app.register(mongoClient, {
    forceClose: true,
    url: "mongodb+srv://admin:PC9gZX3rQaYWDboL@clusterlabs.s6fdkem.mongodb.net",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app.register(userRoutes);

  return app;
}
