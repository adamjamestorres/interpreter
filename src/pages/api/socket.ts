import { Server } from 'socket.io';
import type { NextApiRequest, NextApiResponse } from 'next';

const SocketHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const server = (res.socket as any).server;
  if (!server.io) {
    const io = new Server(server);
    server.io = io;

    io.on('connection', (socket) => {
      socket.on('create-room', (roomId: string) => {
        socket.join(roomId);
      });

      socket.on('join-room', (roomId: string) => {
        socket.join(roomId);
        socket.to(roomId).emit('user-joined');
      });

      socket.on('signal', ({ signal, roomId }) => {
        socket.to(roomId).emit('signal', { signal });
      });
    });
  }

  res.end();
};

export default SocketHandler;