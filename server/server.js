require('./config/config');

const compression = require('compression');
const helmet = require('helmet');

const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');

const port = process.env.PORT;
const app = express();
const server = http.createServer(app);

// setInterval(function() {
//     http.get('https://pacific-dusk-80792.herokuapp.com');
// }, 1800000);

app.use(compression());
app.use(helmet());

//Output folder
const publicPath = path.join(__dirname, './../dist/');
app.use(express.static(publicPath));

//Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//API for interacting with MongoDB (after body-parser middleware)
const api = require('./routes/api');
app.use('/api', api);

//Send all other routes (define last):
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './../dist/index.html'));
})

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});
