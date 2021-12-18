const tasksService = require('./task.service');

async function routes(fastify) {

  fastify.get('/boards/:boardId/tasks', async () => {
    const result = await tasksService.getAllTasks();
    if (!result) {
      throw new Error('No tasks found');
    }
    return result;
  });

  fastify.get('/boards/:boardId/tasks/:taskId', async (request, reply) => {
    const result = await tasksService.getTaskById(request.params.boardId, request.params.taskId);
    if (!result) {
      reply.status(404).send(new Error(`Task with id ${request.params.taskId} not found`));
    }
    return result;
  });

  fastify.post('/boards/:boardId/tasks', async (request, reply) => {
    const result = await tasksService.createTask(request.body, request.params);
    reply.code(201);
    if (!result) {
      throw new Error('No tasks found');
    }
    return result;
  });

  fastify.put('/boards/:boardId/tasks/:taskId', async (request, reply) => {
    const result = await tasksService.updateTask(request.params.boardId, request.params.taskId, request.body);
    if (!result) {
      reply.status(404).send(new Error(`Task with id ${request.params.taskId} not found`));
    }
    return result;
  });

  fastify.delete('/boards/:boardId/tasks/:taskId', async (request, reply) => {
    const result = await tasksService.deleteTask(request.params.boardId, request.params.taskId);
    if (!result) {
      reply.status(404).send(new Error(`Task with id ${request.params.taskId} not found`));
    }
    return result;
  });
}

module.exports = routes;