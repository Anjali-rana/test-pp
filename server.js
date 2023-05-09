const express = require('express');
const connectDb = require('./models/connection')
connectDb()

const userRoute = require('./routes/user');
const taskRoute = require('./routes/task');
const config = require('./config');

const app = express();
app.use(express.json());

app.use('/api/auth', userRoute);
app.use('/api/task', taskRoute);


app.get('/', (req, res) => {
    res.send("welcome to app")
})

app.listen(config.port, () => {
    console.log(`server at http://localhost:${config.port}`)
});