const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const apiRouter = require("./routes/api");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", apiRouter);

const port = process.env.PORT || 8080;
app.listen(port,()=>{
  console.log(`Listening to port ${port}`)
});
