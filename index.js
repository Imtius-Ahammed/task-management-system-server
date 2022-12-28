const express = require("express");
const cors = require("cors");

const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ruqflxh.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
  try{
    const taskAddition =client.db('doctorsPortal').collection('taskContainer')

//  get task
    app.get("/allTasks", async (req, res) => {
      const query = {};
      const cursor = taskAddition.find(query);
      const tasks = await cursor.toArray();
      res.send(tasks);
    });

//post task
    app.post("/addTask", async (req, res) => {
      const postTask = req.body;
      const result = await taskAddition.insertOne(postTask);
      res.send(result);
    });

  }
  finally{

  }

}
run().catch(console.log);


app.get("/", (req, res) => {
  res.send("Task server us running");
});

app.listen(port, () => {
  console.log(`Task server is running on ${port}`);
});