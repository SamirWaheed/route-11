import bootStrap from './app.bootStrap.js'; 

import express from 'express';

const app = express();
const port = 3000;

bootStrap(app);
app.listen(port, () => console.log('Server Run successfully'));