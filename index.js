const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dqge6.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const serviceCollection = client.db('manufacturerWebsite').collection('services');
        const orderCollection = client.db('manufacturerWebsite').collection('order');

        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });
        app.get('/service/:id', async (req, res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const service = await serviceCollection.findOne(query);
            res.send(service);
        });

        app.get('/order', async(req, res) =>{
            const buyer = req.query.buyer;
            const query = {buyer: buyer};
            const order = await orderCollection.find(query).toArray();
            res.send(order);

        })
        app.post('/order', async (req, res) => {
            const order = req.body;
            const query = {name: order.order, quantity: order.quantity, buyer: order.buyer}

            const result = await orderCollection.insertOne(order);
            res.send(result);
          });
      
    }
    finally{

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('server working')
})

app.listen(port, () =>{
    console.log('listening', port)
})