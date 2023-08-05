import dotenv from 'dotenv';
dotenv.config();

import App from './App';

const server = new App().app;

server.listen(process.env.PORT || 3333, () => {
  console.log('Server is running on port 3333'); 
});
