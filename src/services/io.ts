import io from 'socket.io';
import { Server } from 'http';
import { Express } from 'express';

export default (app: Express) => io(new Server(app));
