const express = require("express");
const app = express();
var cors = require("cors");

const port = 7000;

// Node.js middleware for parsing incoming request bodies
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50000mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50000mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(
  express.urlencoded({
    limit: "50000mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(express.json());
app.use(express.text());

// only these frontend request are allowed to access the server
var whitelist = [
  "http://localhost:5500",
  "http://localhost:3001",
  "http://localhost",
  "http://localhost:3000",
  "http://localhost/test",,  
]; //white list consumers

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
};

//adding cors middleware to the express with above configurations
app.use(cors(corsOptions)); 

app.get("/", (request, response) => {
  console.log("i am here api")  
  response.json(`Server is running on port ${port}`);      
});


app.listen(port, async(req, res) => {
  console.log(`App running on port ${port}.`);
}); 


