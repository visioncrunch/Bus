
import { Server } from 'socket.io';

export const initializeSocketIO = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*', // Update this to restrict origins in production
        },
    });

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        // Handle custom events
        socket.on('start-game', (data) => {
            console.log('Game started by:', data);
            // Broadcast to other clients
            socket.broadcast.emit('game-started', { message: `Game started by ${socket.id}`, data });
        });

        socket.on('submit-answer', (data) => {
            console.log('Answer submitted:', data);
            io.emit('answer-received', { message: 'Answer received', data }); // Notify all clients
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });

    console.log('Socket.IO initialized.');
};