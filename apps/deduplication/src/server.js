import Build from "./app.js";

const server = Build();

const start = async () => {
  await server.listen({ port: 3000, host: "0.0.0.0" });
  server.log.info(server.printRoutes());
};

start().catch((err) =>
  server.log.error("Error while initialized the server...", err)
);
