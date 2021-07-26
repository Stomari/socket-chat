import { createContext } from 'react';
import { io, Socket } from 'socket.io-client';

export const socket = io('http://localhost:3000', { transports: ['websocket'] });
export const SocketContext = createContext<Socket>(socket);
