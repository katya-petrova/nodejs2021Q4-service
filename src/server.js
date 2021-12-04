const fastify = require('fastify')({
  logger: {
    prettyPrint: true,
  },
});

const { PORT } = require('./common/config');

fastify.register(require('./resources/users/user.router'));
fastify.register(require('./resources/boards/board.router'));
fastify.register(require('./resources/tasks/task.router'));


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
