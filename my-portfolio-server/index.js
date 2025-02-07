const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = 3000;

const app = express();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.dmztt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const database = client.db("portfolio");

    const bannerCollection = database.collection("banner");
    const findCollection = database.collection("find");
    const aboutCollection = database.collection("about");
    const skillCollection = database.collection("skill");
    const educationCollection = database.collection("education");
    const projectCollection = database.collection("project");
    const contactCollection = database.collection("contact");
    const quoteCollection = database.collection("quote");

    // user APIs

    // get from banner collection
    app.get("/intro", async (req, res) => {
      const intro = await bannerCollection.find({}).toArray();
      res.send(intro);
    });
    
    // upload image
    app.post("/upload", async (req, res) => {
      const file = req.files.file;
      const url = await cloudinary.uploader.upload(file.tempFilePath);
      res.send(url);
    });

    // Get all banner data
    app.get("/banner", async (req, res) => {
      const banner = await bannerCollection.find({}).toArray();
      res.send(banner);
    });

    // post a new about data
    app.post("/banner", async (req, res) => {
      const banner = req.body;
      const result = await bannerCollection.insertOne(banner);
      res.send(result);
    });

    // Add this new PATCH endpoint
    app.patch("/banner", async (req, res) => {
      const updatedData = req.body;
      const result = await bannerCollection.updateOne(
        {}, // update the first document since we only have one about section
        { $set: updatedData },
        { upsert: true } // create if doesn't exist
      );
      res.send(result);
    });

    // get find data
    app.get("/find-update", async (req, res) => {
      const find = await findCollection.find({}).toArray();
      res.send(find);
    });

    // post new find data
    app.post("/find-update", async (req, res) => {
      const find = req.body;
      const result = await findCollection.insertOne(find);
      res.send(result);
    });

    // update new find data
    app.patch("/find-update/:id", async (req, res) => {
      const updatedData = req.body;
      const result = await findCollection.updateOne(
        {},
        { $set: updatedData },
        { upsert: true }
      );
      res.send(result);
    });

    // get about data
    app.get("/about", async (req, res) => {
      const about = await aboutCollection.find({}).toArray();
      res.send(about);
    });

    // update about data
    app.patch("/about", async (req, res) => {
      const updatedData = req.body;
      const result = await aboutCollection.updateOne(
        {},
        { $set: updatedData },
        { upsert: true }
      );
      res.send(result);
    });

    // get skill data
    app.get("/skills", async (req, res) => {
      const skills = await skillCollection.find({}).toArray();
      res.send(skills);
    });

    // add new skill data
    app.post("/skills", async (req, res) => {
      const skill = req.body;
      const result = await skillCollection.insertOne(skill);
      res.send(result);
    });

    // update skill data
    app.patch("/skills", async (req, res) => {
      const updatedData = req.body;
      const result = await skillCollection.updateOne(
        {},
        { $set: updatedData },
        { upsert: true }
      );
      res.send(result);
    });

    // get education data
    app.get("/education", async (req, res) => {
      const education = await educationCollection.find({}).toArray();
      res.send(education);
    });

    // post new education data
    app.post("/education", async (req, res) => {
      const education = req.body;
      const result = await educationCollection.insertOne(education);
      res.send(result);
    });

    // update education data
    app.patch("/education", async (req, res) => {
      const updatedData = req.body;
      const result = await educationCollection.updateOne(
        {},
        { $set: updatedData },
        { upsert: true }
      );
      res.send(result);
    });

    // get project data
    app.get("/projects", async (req, res) => {
      const projects = await projectCollection.find({}).toArray();
      res.send(projects);
    });

    // post new project data
    app.post("/projects", async (req, res) => {
      const project = req.body;
      const result = await projectCollection.insertOne(project);
      res.send(result);
    });

    // update project data
    app.patch("/projects", async (req, res) => {
      const updatedData = req.body;
      const result = await projectCollection.updateOne(
        {},
        { $set: updatedData },
        { upsert: true }
      );
      res.send(result);
    });

    // get contact data
    app.get("/contact", async (req, res) => {
      const contact = await contactCollection.find({}).toArray();
      res.send(contact);
    });

    // post new contact data
    app.post("/contact", async (req, res) => {
      const contact = req.body;
      const result = await contactCollection.insertOne(contact);
      res.send(result);
    });

    // update contact data
    app.patch("/contact", async (req, res) => {
      const updatedData = req.body;
      const result = await contactCollection.updateOne(
        {},
        { $set: updatedData },
        { upsert: true }
      );
      res.send(result);
    });

    // get quote data
    app.get("/quote", async (req, res) => {
      const quote = await quoteCollection.find({}).toArray();
      res.send(quote);
    });

    // update quote data
    app.patch("/quote", async (req, res) => {
      const updatedData = req.body;
      const result = await quoteCollection.updateOne(
        {},
        { $set: updatedData },
        { upsert: true }
      );
      res.send(result);
    });

    // add new quote data
    app.post("/quote", async (req, res) => {
      const quote = req.body;
      const result = await quoteCollection.insertOne(quote);
      res.send(result);
    });

    // await client.connect();
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    //   await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Portfolio Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
