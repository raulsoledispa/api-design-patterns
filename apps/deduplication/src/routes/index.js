async function routes(fastify) {
  fastify.get("/api/users", async (request, reply) => {
    const collection = fastify.mongo.client.db("test").collection("data");
    return await collection.find({}).toArray();
  });

  fastify.post("/api/users", async (req, reply) => {
    const { user } = req.body


    const collection = fastify.mongo.client.db("test").collection("data");
    await collection.insertOne(user);
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
