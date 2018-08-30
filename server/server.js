const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');

const port = process.env.port || 3000;
const app = express();
const server = http.createServer(app);

//API for interacting with MongoDB
const api = require('./routes/api');
app.use('/api', api);

//Output folder
const publicPath = path.join(__dirname, './../dist/QnA');
app.use(express.static(publicPath));

//Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Send all other routes (always define last):
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './../dist/QnA/index.html'));
})

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});