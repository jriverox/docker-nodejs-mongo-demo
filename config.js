const dotenv = require('dotenv');
const result = dotenv.config();

let properties = {};
const defaultDb = 'apidb';
const defaultPort = 3000;
const defaultDBHost = '127.0.0.1';

if(result.error){
    properties = {
        dbHost: process.env.MONGO_HOST || defaultDBHost,
        dbConnection: process.env.MONGO_URI || '',
        dbName: process.env.MONGO_DB || defaultDb,
        port: process.env.PORT || defaultPort
    };
} else{
    const {parsed: envs} = result;

    properties = {
        dbHost: envs.MONGO_HOST || defaultDBHost,
        dbConnection: envs.MONGO_URI || '',
        dbName: envs.MONGO_DB || defaultDb,
        port: envs.PORT || defaultPort
    };
}

let getDbConnection = () => {
    return properties.dbConnection.replace('localhost', properties.dbHost);
};

module.exports = {
    dbHost: properties.dbHost,
    dbConnection: getDbConnection(),
    dbName: properties.dbName,
    port: properties.port
};