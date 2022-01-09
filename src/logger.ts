import { TransportMultiOptions, Logger, pino } from 'pino';

const transport = pino.transport(<TransportMultiOptions>{
  targets: [
    {
      target: 'pino/file',
      level: 'error',
      options: { destination: './logs/error.txt', mkdir: true, colorize: true },
    },
    {
      target: 'pino/file',
      level: 'info',
      options: { destination: './logs/logging.txt', mkdir: true, colorize: true,  translateTime: 'yyyy-dd-mm, h:MM:ss TT', },
    },
  ],
});

export const logger: Logger = pino(transport);


export default logger;
