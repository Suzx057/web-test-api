// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const {logger} = require("firebase-functions");
const {onRequest, HttpsError} = require("firebase-functions/v2/https");
require("firebase-functions/v2/firestore");

// The Firebase Admin SDK to access Firestore.
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

initializeApp();

exports.Art057 = onRequest((request, response) => {
  logger.info("Hello logs!", request.query.id);
  if (request.method == "GET") {
    const id = request.query.id;
    response.send("this quiery id == " + id);
  } else {
    throw new HttpsError("unauthenticated", "Unauthorized method");
  }
});

exports.AARRT058 = onRequest((request, response) => {
  logger.info("Hello logs!", request.body );
  if (request.method == "POST") {
    const id = request.body.id;
    const name = request.query.name;
    response.send("This is post method == " + id + "name == " + name);
  } else {
    throw new HttpsError("unauthenticated", "Unauthorized method");
  }
});

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send(" is a api / ");
});


app.get("/addcategory", async (req, res) => {
  const title = req.query.text; // ส่ง get ?text=art
  const writeResult = await getFirestore()
      .collection("category-Art")
      .add({title: title});
  res.json({result: `Message with ID: ${writeResult.id} added.`});
});

app.get("/getallcategory", async (req, res) => {
  const result = await getFirestore()
      .collection("category-Art")
      .get();
  logger.info(result.docs);
  const artresult = [];
  for (const doc of result.docs) {
    artresult.push({title: doc.data().title, Name: doc.data().title});
  }
  res.json(artresult);
});

app.post("/addproduct", async (req, res) => {
  const product = req.body.product;
  const name = req.body.name;
  const price = req.body.price;
  const prodes = req.body.prodes;
  const status = req.body.status;
  if (!product) {
    res.status(400).send("productName not found !");
  } else if (typeof price !="number") {
    res.status(400).send("กรุณาใส่เลข!!");
  } else {
    await getFirestore()
        .collection("product-Art")
        .add({
          name: name,
          product: product,
          price: price,
          prodes: prodes,
          status: status,
        });
  }
  res.status(200).send("ok");
});

app.post("/updateproduct", async (request, response) => {
  const docId = request.query.uuid;
  const data = request.body;
  if (!docId) {
    response.status(400).send("uuid not found !");
  } else if (!data.product) {
    response.status(400).send("productName not found !");
  } else if (typeof data.price != "number") {
    response.status(400).send("price is not number !");
  } else {
    await getFirestore()
        .collection("product-Art")
        .doc(docId)
        .set({...data}, {merge: true});
  }
  response.status(200).send("ok");
});

app.get("/getallproduct", async (request, response) => {
  const result = await getFirestore()
      .collection("product-Art")
      .get();

  const resultAr = [];
  for (const doc of result.docs) {
    resultAr.push(doc.data());
  }
  response.json(resultAr);
});

app.get("/getproduct", async (request, response) => {
  const docId = request.query.uuid;
  const result = await getFirestore()
      .collection("product-Art")
      .doc(docId)
      .get();

  response.json(result.data());
});

exports.expressArt = onRequest({cors: true}, app);
