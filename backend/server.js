require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/db/db');

const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);


const PORT = process.env.PORT || 3000;

async function startServer() {

    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server Started at Port: ${PORT}`)
    });

}

startServer();