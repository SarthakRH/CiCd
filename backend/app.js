const express = require('express');
require('dotenv').config();
const {connectDB} = require('./config/db');
const morgan = require('morgan')
const cors = require('cors');
const {errorMiddleware} = require('./middleware/errorMiddleware')


const app = express();
app.use(cors());
app.use(morgan('tiny'))
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/auth',require('./routes/authRoutes'));
app.use('/admin',require('./routes/admin'));
app.use('/gyan',require('./routes/gyanRoutes'));


app.get('/user',(req,res)=>{
  res.status(200).json({...req.user})
})

app.use(errorMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(process.env.PORT, () => {
      console.log(`Listening at port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start()