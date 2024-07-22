// NODE FRAMEWORK
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
require('dotenv').config();
require('./Database/db_connection');
app.use(express.json())

// Routers
const userRoutes =  require('./Routes/user');
app.use(userRoutes)

const PORT = process.env.PORT || 3000
//server
server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
