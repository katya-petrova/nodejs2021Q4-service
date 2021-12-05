// const router = require('express').Router();
// const User = require('./user.model');
// const usersService = require('./user.service');

// router.route('/').get(async (req, res) => {
//   const users = await usersService.getAll();
//   // map user fields to exclude secret fields like "password"
//   res.json(users.map(User.toResponse));
// });

// module.exports = router;

const usersService = require('./user.service');

async function routes(fastify) {
  fastify.get('/', async () => ('Welcome to Node.js service!'));

  fastify.get('/users', async () => {
    const result = await usersService.getAll();
    if (!result) {
      throw new Error('No users found');
    }
    return result;
  });

  fastify.get('/users/:id', async (request, reply) => {
    const result = await usersService.getUserById(request.params.id);
    if (!result) {
      reply.status(404).send(new Error(`User with id ${request.params.id} not found`));
    }
    return result;
  });

  fastify.post('/users', async (request, reply) => {
    const result = await usersService.createUser(request.body);
    reply.code(201);
    if (!result) {
      throw new Error('No users found');
    }
    return result;
  });

  fastify.put('/users/:id', async (request, reply) => {
    const result = await usersService.updateUser(request.params.id, request.body);
    if (!result) {
      reply.status(404).send(new Error(`User with id ${request.params.id} not found`));
    }
    return result;
  });

  fastify.delete('/users/:id', async (request, reply) => {
    const result = await usersService.deleteUser(request.params.id);
    if (!result) {
      reply.status(404).send(new Error(`User with id ${request.params.id} not found`));
    }
    return result;
  });
}

module.exports = routes;
