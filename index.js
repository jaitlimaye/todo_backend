const express = require('express');
const mongodb = require('mongodb');
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const dailyDAO = require("./api/DAO/dailyDAO.js");
const ltDAO = require("./api/DAO/ltDAO.js")
const router = require("./api/routes.js")

const dotenv = require("dotenv");
const port = process.env.PORT || 8000;
dotenv.config()

app.use("/api/v1/todo",router);
app.use("*",(req,res) => res.status(404).json({error: "not found"}));

const Mongodb_Client = mongodb.MongoClient;


Mongodb_Client.connect(
    process.env.REV_DB_URI,
    {
        maxpoolSize: 50,
        wtimeoutMS: 250,
        useNewUrlParser: true
    }
    
).catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    await dailyDAO.injectDB(client);
    await ltDAO.injectDB(client);
    app.listen(port,() => {
        console.log(`listening on port ${port}`)
    }
    )
})

