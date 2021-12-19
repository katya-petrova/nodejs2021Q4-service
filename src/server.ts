const fastify = require('fastify')({
  logger: {
    prettyPrint: true,
  },
});

const { PORT } = require('./common/config');

fastify.register(require('./resources/users/user.router'));
fastify.register(require('./resources/boards/board.router'));
fastify.register(require('./resources/tasks/task.router'));

/**
 * createы server
 * @returns Promise<void>
 */

fastify.listen(PORT, (err: string, address: string) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
