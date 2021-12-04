const fastify = require('fastify')({
  logger: {
    prettyPrint: true,
  },
});

const { PORT } = require('./common/config');

//   fastify.get('/', (req, reply) => {
//     reply.send('Hello World!');
//   });

fastify.register(require('./resources/users/user.router'));

// const blogRoutes = require("./router")

// blogRoutes.forEach((route) => {
//     fastify.route(route)
// })

fastify.listen(PORT, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});

// const startServer = async () => {
//     try {
//       await fastify.listen(PORT);
//     } catch (err) {
//       fastify.log.error(err);
//       process.exit(1);
//     }
//   };

//   startServer();
