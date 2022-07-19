import { createCache } from "async-cache-dedupe";



async function repository(fastify, opts) {
    const collection = fastify.mongo.client.db("test").collection("data");
    const cache = createCache({ ttl: 60});

    cache.define("createUser", (id) => collection.find({}))
}