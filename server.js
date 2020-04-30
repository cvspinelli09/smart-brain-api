const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt-nodejs');
const cors = require("cors");
const knex = require('knex');
const morgan = require('morgan');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image_demographics');

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: "4000",
    user: "cristian",
    password: "",
    database: "smart-brain1"
  },
});

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("IT'S WORKING!"));
app.post("/signin", signin.handleSignin(db, bcrypt));
app.post("/register", register.handleRegister(db, bcrypt));
app.get("/profile/:id", profile.handleProfileGet(db));
app.put("/image", image.handleImage(db));
app.post("/imageurl", image.handleAPICall(db));

app.listen(process.env.PORT || 3000, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});
