import { createHash } from "crypto";


async function routes(fastify) {
  fastify.get("/api/users", async (request, reply) => {
    const collection = fastify.mongo.client.db("test").collection("data");
    return await collection.find({}).toArray();
  });

  fastify.post("/api/users", async (req, reply) => {
    const { user, transactionId } = req.body

    const hash = createHash("sha256").update(JSON.stringify(req.body)).digest("hex");

    const cachedResult = await fastify.redis.get(transactionId);

    if(!cachedResult) {
      const collection = fastify.mongo.client.db("test").collection("data");
      await collection.insertOne(user);
      const response = { message: "User created" }
      await fastify.redis.set(transactionId, JSON.stringify({hash, response}))
      return response;
    }

    const cachedValue = JSON.parse(cachedResult);

    if(hash === cachedValue.hash){
      reply.send(cachedValue.response)
    }else{
      reply.code(409).send();
    }
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
