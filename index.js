const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const config = require('./config');
console.log(config);

const options = {
    useNewUrlParser: true, 
    reconnectTries: 60, 
    reconnectInterval: 1000
};
const routes = require('./routes/routes.js');
const app = express();
const http = require('http').Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routes);
app.use((req, res) => {
    res.status(404)
});

MongoClient.connect(config.dbConnection, options, (err, database) => {
    if(err){
        console.log(`FATAL MONGODB CONNECTION ERROR: ${err}:${err.stack}`);
        process.exit(1)
    }
    app.locals.db = database.db(config.dbName);
    http.listen(config.port, () => {
        console.log('Listening on port', config.port)
        app.emit('APP_STARTED')
      });
});

module.exports = app;