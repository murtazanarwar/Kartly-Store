import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function getStoreSocket(): Socket {
  if (!socket) {
    socket = io(
      `${process.env.NEXT_PUBLIC_SOCKET_SERVICE_URL}/stock`,
      { autoConnect: false }
    );
  }
  return socket;
}
