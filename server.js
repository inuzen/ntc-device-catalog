const express = require('express');
const dbConfig = require('./config/db');
const path = require('path');
const app = express();
var cors = require('cors');
//Connnect Database
dbConfig.connectDB();
//cors
app.use(cors());
//Init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
    res.json({ msg: 'Welcome to the ntc-device-organiser API' });
});

//Define routes
//app.use('/api/auth', require('./routes/auth'));
app.use('/api/devices', require('./routes/devices'));

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('server started on ', PORT));
