const express = require("express");
const path = require("path");
const {connectMongoDb} = require('./connection')
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter')
const  URL  = require("./models/url");

const app = express();
const PORT = 8004;

//connection
connectMongoDb("mongodb://127.0.0.1:27017/URL_short").then(()=>{
    console.log("MongoDb connected !!");
}).catch((err)=>{
    console.log("Error ",err)
});

//ejs 
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

//route
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use("/url",urlRoute);
app.use("/",staticRoute);

app.listen(PORT,()=>{
    console.log(`Server Started at PORT: ${PORT}`)
})