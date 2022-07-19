async function routes(fastify) {
  fastify.get("/api/users", async (reply) => {
    const collection = fastify.mongo.client.db("test").collection("data");
    reply.send(collection.find({}).toArray());
  });

  fastify.post("/api/users", async (req, reply) => {
    const collection = fastify.mongo.client.db("test").collection("data");
    await collection.insertOne(req.body);
    reply.send({ message: "OK" });
  });

  fastify.put("/api/users", async (req, reply) => {
    const collection = fastify.mongo.client.db("test").collection("data");
    const userId = fastify.mongo.ObjectId(req.body.id);
    await collection.updateOne(
      { _id: userId },
      { $set: { name: req.body.name } }
    );
    reply.send({ message: "OK" });
  });
}

export default routes;
