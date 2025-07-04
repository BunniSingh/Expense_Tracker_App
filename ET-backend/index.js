let express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user.route');
const cookieParser = require('cookie-parser');
const expenseRouter = require('./routes/expense.route');

require('dotenv').config();
let app = express();

let port = process.env.PORT;
let DB_URI = process.env.MONGO_URI;

app.use(cookieParser());
app.use(express.json());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/expense', expenseRouter);

mongoose
    .connect(DB_URI)
    .then(()=>console.log("DB connected Sucessfully✅"))
    .catch((err)=> console.log('Error while connecting DB:', err))

app.listen(port, ()=> console.log("Server is started on port number " + port));
