// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    sessionDBURI: process.env.sessionDBURI,
    port: process.env.port,
    secret: process.env.secret
};