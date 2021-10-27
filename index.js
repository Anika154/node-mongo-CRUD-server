const express = require('express');

const { MongoClient } = require('mongodb');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;


const app = express();
const port = 5000;

//middleware
app.use(cors());
app.use(express.json());

//user: mydb
//pass:anika408


const uri = "mongodb+srv://mydb:anika408@cluster0.urlm5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
        await client.connect();
        const database = client.db("foodMaster");
        usersCollection = database.collection("users");
        //Get API
        app.get('/users', async (req, res) => {
            const cursor = usersCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
        });

        app.get('/users/id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const user = await usersCollection.findOne(query);
            console.log('load user with id:', id);
            res.send('getting soon');
        });

        //POST API
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const result = await usersCollection.insertOne(newUser);
            console.log('got new user', req.body);
            console.log('added user', result);
            res.send(user);
        });

        //UPDATE API
        add.put('/user/:id', async (req, res) => {
            const id = req.params.id;
            const updatedUser = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: updatedUser.name,
                    email: updatedUser.email
                },
            };
            const result = await usersCollection.updateOne(filter, updateDoc, options)

            console.log(req.params.id);
            res.json(result);
        })

        //DELETE API
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await usersCollection.deleteOne(query);

            console.log('deleting user with id', result);
            res.json(result);
        })


    } finally {
        // await client.close();
    }
}
run().catch(console.dir);







client.connect(err => {
    const collection = client.db("foodMaster").collection("users");
    // perform actions on the collection object
    console.log("hitting the database");
    // console.error(err);
    const user = { name: 'Mahiya Mahi', email: 'mahi@gmail.com', phone: '0199999999999' };
    collection.insertOne(user)
        .then(() => {
            console.log('insert successful');
        })

    // client.close();
});

app.get('/', (req, res) => {
    res.send('Running my CRUD server');
});
app.listen(port, () => {
    console.log('Running Server on port', port);
})