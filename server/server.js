require('./config/config');

const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');

const port = process.env.PORT;
const app = express();
const server = http.createServer(app);

//Output folder
const publicPath = path.join(__dirname, './../dist/');
app.use(express.static(publicPath));

//Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//API for interacting with MongoDB (after body-parser middleware)
const api = require('./routes/api');
app.use('/api', api);

//Send all other routes (always define last):
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './../dist/index.html'));
})

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});
