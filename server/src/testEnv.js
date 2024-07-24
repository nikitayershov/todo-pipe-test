const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env')});

console.log('Loaded Environment Variables:', process.env.PASSWORD );
