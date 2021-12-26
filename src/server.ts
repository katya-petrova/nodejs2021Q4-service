import { app } from './logger';

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

