const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const badgesRoute = require('./routes/badgesRoute');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/badges', badgesRoute);

connectDB(); // call the database connection function

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
