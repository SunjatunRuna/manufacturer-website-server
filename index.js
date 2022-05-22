const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dqge6.mongodb.net/?retryWrites=true&w=majority`;


app.get('/', (req, res) => {
    res.send('server working')
})

app.listen(port, () =>{
    console.log('listening', port)
})