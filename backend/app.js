const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const pacientsRoutes = require("./routes/pacients");

const app = express();
mongoose
  .connect(
    "mongodb://jorge:" +
      "jorgemejia3223L" +
      "@cluster0-shard-00-00-nhims.mongodb.net:27017,cluster0-shard-00-01-nhims.mongodb.net:27017,cluster0-shard-00-02-nhims.mongodb.net:27017/medicamentosDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"
      , {useNewUrlParser: true})
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log("Connection failed!", err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/images', express.static(path.join('backend/images')));
app.use("/", express.static(path.join(__dirname, "/dist/clinic/index.html")));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, PUT, OPTIONS'
  );
  next();
});

app.use('/api/pacients', pacientsRoutes);
module.exports = app;
