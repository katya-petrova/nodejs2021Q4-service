import { fastify, FastifyReply, FastifyRequest } from 'fastify';

export const app = fastify({
  logger: {
    level: 'info', // error, trace, debug, warn
    prettyPrint: {
      colorize: true, // colorizes the log
      levelFirst: true,
      translateTime: 'yyyy-dd-mm, h:MM:ss TT',
    },

    file: './log/logging.txt', // Will use pino.destination()
  },
});

app.addHook('preHandler', async (req: FastifyRequest, reply: FastifyReply) => {
  if (req.body) {
    req.log.info({ body: req.body, params: req.params }, 'parsed body');
    reply.log.info({ body: req.body }, 'parsed body');
  }
});

export default app;
