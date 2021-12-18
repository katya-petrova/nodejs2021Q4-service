import { FastifyInstance , FastifyPluginOptions } from 'fastify';


const boardsService = require('./board.service');

async function routes(fastify: FastifyInstance) {
  fastify.get('/boards', async () => {
    const result = await boardsService.getAll();
    if (!result) {
      throw new Error('No boards found');
    }
    return result;
  });

  fastify.get('/boards/:id', async (request: FastifyPluginOptions, reply) => {
    const result = await boardsService.getBoardById(request.params.id);
    if (!result) {
      reply
        .status(404)
        .send(new Error(`Board with id ${request.params.id} not found`));
    }
    return result;
  });

  fastify.post('/boards', async (request: FastifyPluginOptions, reply) => {
    const result = await boardsService.createBoard(request.body);
    reply.code(201);
    if (!result) {
      throw new Error('No boards found');
    }
    return result;
  });

  fastify.put('/boards/:id', async (request: FastifyPluginOptions, reply) => {
    const result = await boardsService.updateBoard(
      request.params.id,
      request.body
    );
    if (!result) {
      reply
        .status(404)
        .send(new Error(`Board with id ${request.params.id} not found`));
    }
    return result;
  });

  fastify.delete(
    '/boards/:id',
    async (request: FastifyPluginOptions, reply) => {
      const result = await boardsService.deleteBoard(request.params.id);
      if (!result) {
        reply
          .status(404)
          .send(new Error(`User with id ${request.params.id} not found`));
      }
      return result;
    }
  );
}

module.exports = routes;
