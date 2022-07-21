import { createHash } from "crypto";

async function routes(fastify) {
  /* eslint no-unused-vars: ["error", { "args" : "none"}] */
  fastify.get("/api/users", async (request, reply) => {
    const collection = fastify.mongo.client.db("test").collection("data");
    return collection.find({}).toArray();
  });

  fastify.post("/api/users", async (req, reply) => {
    let response;
    const { user, transactionId } = req.body;

    const hash = createHash("sha256")
      .update(JSON.stringify(req.body))
      .digest("hex");

    const cachedRawResult = await fastify.redis.call("JSON.GET", transactionId);

    if (!cachedRawResult) {
      const collection = fastify.mongo.client.db("test").collection("data");
      const { insertedId } = await collection.insertOne(user);
      response = { id: insertedId };

      await fastify.redis.call(
        "JSON.SET",
        transactionId,
        "$",
        JSON.stringify({ hash, response })
      );
      await fastify.redis.expire(transactionId, 10);
      return response;
    }

    const cachedObject = JSON.parse(cachedRawResult);
    if (hash === cachedObject.hash) {
      response = cachedObject.response;
    } else {
      reply.code(409);
    }

    return response;
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
