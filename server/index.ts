/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import dotenv from 'dotenv';

import logger from './utils/logger';

dotenv.config();

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3001'],
  },
});

io.on('connection', (socket: Socket) => {
  logger.info(`Connected to socket ${socket.id}`);

  socket.on('SEND_MESSAGE', (data) => {
    logger.info('Message received', { data });
    io.emit('NEW_MESSAGE', data);
  });
});

httpServer.listen(process.env.PORT);
logger.info(`Server listening to port ${process.env.PORT}`);
