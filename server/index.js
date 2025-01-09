const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

// const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");

const port = process.env.PORT || 9000;
const app = express();

// middleware
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors({ corsOptions }));
app.use(express.json());
// app.use(cookieParser());

//  verify jwt middleware
// const verifyToken = (req, res, next) => {
//   const token = req.cookies?.token;
//   if (!token) return res.status(401).send({ message: " unauthorized access" });
//   if (token) {
//     jwt.verify(token, process.env.ACCESS_TOKEN_SELECTS, (err, decoded) => {
//       if (err) {
//         return res.status(401).send({ message: "unauthorized access" });
//       }
//       req.user=decoded;
//       next();
//     });
//   }
  
// };

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dthbdpl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // collection
    const marketCollection = client.db("market_nest_projects");
    const jobsCollection = marketCollection.collection("jobs");
    const bidsCollection = marketCollection.collection("bids");

    // jwt generate
    // app.post("/jwt", async (req, res) => {
    //   const user = req.body;
    //   const token = jwt.sign(user, process.env.ACCESS_TOKEN_SELECTS, {
    //     expiresIn: "365d",
    //   });
    //   res
    //     .cookie("token", token, {
    //       httpOnly: true,
    //       secure: process.env.NODE_ENV === "production",
    //       sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    //     })
    //     .send({ success: true });
    // });

    // clear token log out
    // app.get("/logout", (req, res) => {
    //   res
    //     .clearCookie("token", {
    //       httpOnly: true,
    //       secure: process.env.NODE_ENV === "production",
    //       sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    //       maxAge: 0,
    //     })
    //     .send({ success: true });
    // });

    // save bids data
    app.post("/bid", async (req, res) => {
      const result = await bidsCollection.insertOne(req.body);
      console.log(result);
      res.send(result);
    });

    // add job
    app.post("/job", async (req, res) => {
      const result = await jobsCollection.insertOne(req.body);
      console.log(result);
      res.send(result);
    });

    // my posted jobs
    app.get("/jobs/:email", async (req, res) => {
      const email = req.params.email;
      const query = { "buyer.email": email };
      const result = await jobsCollection.find(query).toArray();
      res.send(result);
    });

    // my posted jobs deleted
    app.delete("/jobDeleted/:id", async (req, res) => {
      console.log(req.params.id);
      const result = await jobsCollection.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      console.log(result);
      res.send(result);
    });

    // my jobs Updated
    app.put("/job/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const joData = req.body;
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          ...joData,
        },
      };
      const result = await jobsCollection.updateOne(query, updateDoc, options);
      res.send(result);
    });
    // get all jobs data
    app.get("/jobs", async (req, res) => {
      const result = await jobsCollection.find().toArray();
      res.send(result);
    });

    // get single data use id
    app.get("/job/:id", async (req, res) => {
      const result = await jobsCollection.findOne({
        _id: new ObjectId(req.params.id),
      });
      console.log(result);
      res.send(result);
    });

    // get all my bids
    app.get("/my-bids/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await bidsCollection.find(query).toArray();
      res.send(result);
    });

    // get all bids request from db for job owner
    app.get("/bid-request/:email", async (req, res) => {
      const email = req.params.email;
      const query = { "buyer.email": email };
      const result = await bidsCollection.find(query).toArray();
      res.send(result);
    });

    // Update status bid status
    app.patch("/update-status/:id", async (req, res) => {
      const id = req.params.id;
      const status = req.body;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: status,
      };
      const result = await bidsCollection.updateOne(query, updateDoc);
      console.log(result);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Market Nest server is running");
});
app.listen(port, (req, res) => {
  console.log(`Market Nest server is running on port : ${port}`);
});
