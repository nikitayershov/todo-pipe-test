const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

// API routes
const router = require('./router');
app.use('/api', router);

// Serve static files from the dist folder
app.use(express.static(path.join(__dirname, '/dist')));

// Handle all other routes with the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '/dist', 'index.html'));
});

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log(`Server is running on port ${port}`);
  app.listen(port);
}).catch(err => {
  console.error('Database connection error:', err);
});  
 

// const express = require('express');
// const dotenv = require('dotenv');
// const path = require('path');

// const morgan = require('morgan');
// const cors = require('cors');
// const mongoose = require('mongoose');

// const router = require('./router');
// dotenv.config({ path: path.resolve(__dirname, '../.env')});
// console.log(process.env.MONGO_URI)

// const app = express();

// app.use(express.json());
// app.use(cors());
// app.use(morgan('tiny'));

// app.use(router);

// mongoose.connect(process.env.MONGO_URI).then(() => {
//   console.log('starting on port 8080');
//   app.listen(8080);
// })