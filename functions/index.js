require("dotenv").config();
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { setGlobalOptions } = require("firebase-functions");
//const { Message } = require("firebase-functions/pubsub");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
//setGlobalOptions({ maxiInstances: 10 }); 

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "success!",
  });
});

app.post("/payment/create", async (req, res) => {
  const total =parseInt (req.query.total);
 if (total> 0) {
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      
      
    });
      res.status(201).json({clientSecret: paymentIntent.client_secret});
  
    } else {
      res.status(403).json({
         message: "total must be greater than 0",
      });
    }
    
  }
);

exports.api = onRequest(app);



//http://127.0.0.1:5001/clone-499ea/us-central1/api
