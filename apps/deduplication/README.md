# Deduplication Pattern

## Overview



## High-level architecture

![SolutionArchitect](https://res.cloudinary.com/dznnydff7/image/upload/v1658376725/api-design-patterns/Deduplication-Pattern_bsiesm.png)

## Installation

To start the project you need to run the following command:

```sh
git clone https://github.com/raulsoledispa/api-design-patterns.git
pnpm install --filter deduplication
pnpm --filter deduplication start:dependencies
pnpm --filter deduplication start:dev
```



## Usage

To try the API you can use the following command:



```sh
http GET http://localhost:3000/api/users
echo -n '{"transactionId":"3f7d33d4-8a2c-434b-9d3e-5b66595dd419","user":{"name":"User19","last_name":"LastNam19"}}' | http POST http://localhost:3000/api/users
```



## Technologies

- [pnpm](https://pnpm.io/)
- [redis-json](https://redis.io/docs/stack/json/)
- [mongo](https://www.mongodb.com/)
- [fastify](https://github.com/fastify/fastify)
- [fastify-mongodb](https://github.com/fastify/fastify-mongodb)
- [fastify-redis](https://github.com/fastify/fastify-redis)

## Reference

- [API Design Pattern](https://www.manning.com/books/api-design-patterns)

## License

License under [MIT](https://mit-license.org/)

