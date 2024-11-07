
import http from 'http';
import app from './app.js';

const server = http.createServer(app);

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
