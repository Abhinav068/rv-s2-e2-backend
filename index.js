const express = require('express');
const cors = require('cors');
const { connection } = require('./config/db');
const { apiRouter } = require('./Routers/api.router');
require('dotenv').config();

const app = express();
const port = process.env.port;

app.use(express.json());
app.use(cors());
app.use('/api',apiRouter)


app.get('/', (req, res) => {
    res.send('running');
})

app.listen(port, async () => {
    await connection;
    console.log(`running at http://localhost:${port}`);
})