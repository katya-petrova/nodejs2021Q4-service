import { app } from './logger';

// import { FastifyPluginOptions, FastifyServerOptions } from 'fastify';
// import { TransportMultiOptions, Logger, pino } from 'pino';

// const transport = pino.transport(<TransportMultiOptions>{
//   targets: [
//     {
//       target: 'pino/file',
//       level: 'error',
//       options: { destination: './logging.txt', mkdir: true, colorize: true },
//     },
//     {
//       target: 'pino/file',
//       level: 'info',
//       options: { destination: './logging.txt', mkdir: true, colorize: true,  translateTime: 'yyyy-dd-mm, h:MM:ss TT', },
//     },
//   ],
// });

// const pinoLogger: Logger = pino(transport);

// const app = require('fastify')({
//   // logger: { pinoLogger },
//   // logger: {
//   //   level: 'error',
//   //   file: './logging.log', // Will use pino.destination()
//   //   prettyPrint: {
//   //     colorize: true,
//   //     levelFirst: true,
//   //     translateTime: 'yyyy-dd-mm, h:MM:ss TT',
//   //   },
//   // },
// });

// fastify.addHook(
//   'preHandler',
//   async (req: FastifyPluginOptions, reply: FastifyPluginOptions) => {
//     if (req.body) {
//       req.log.info({ body: req.body, params: req.params }, 'parsed body');
//       reply.log.info({ body: req.body }, 'parsed body');
//     }
//   }
// );

// const app = fastify({
//   logger: {
//     level: 'info', // error, trace, debug, warn
//     prettyPrint: {
//       colorize: true, // colorizes the log
//       levelFirst: true,
//       translateTime: 'yyyy-dd-mm, h:MM:ss TT',
//     },

//     file: './log/logging.txt', // Will use pino.destination()
//   },
// });

// app.addHook('preHandler', async (req: FastifyRequest, reply: FastifyReply) => {
//   if (req.body) {
//     req.log.info({ body: req.body, params: req.params }, 'parsed body');
//     reply.log.info({ body: req.body }, 'parsed body');
//   }
// });

const { PORT } = require('./common/config');

app.register(require('./resources/users/user.router'));
app.register(require('./resources/boards/board.router'));
app.register(require('./resources/tasks/task.router'));

/**
 * createы server
 * @returns Promise<void>
 */

app.listen(PORT, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`server listening on port ${PORT}`);
});
// (async () => {
//   try {
//     await app.listen(PORT);
//   } catch (err) {
//     app.log.error(err);
//     process.exit(1);
//   }
// })();
