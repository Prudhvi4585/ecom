import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoute.js';

dotenv.config();

// data base config
connectDB();
const app = express();

// middleware
app.use(express.json());
app.use(morgan('dev'));


app.use('/api/v1/auth', authRoutes);

// rest api
app.get('/', (req, res) => {
  res.send(
    {
        message: 'Hello World!'
    }
  );
});
const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgCyan.white);
});

