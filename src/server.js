import http from 'http'; // Import HTTP module
import app from './app.js'; // Import the Express app
import { initializeSocketIO } from './sockets/gameSocket.js'; // Import Socket.IO logic

const PORT = process.env.PORT || 3000;

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Initialize Socket.IO with the server
initializeSocketIO(server);

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});