// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    token_name: process.env.token_name,
    sessionDBURI: process.env.sessionDBURI,
    port: process.env.port,
    secret: process.env.secret
};