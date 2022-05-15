const express = require('express');
const routes = require('./controllers');
const path = require("path");
const session = require("express-session");
const exphbs = require("express-handlebars");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// where our connection is
const sequelize = require('./config/connection');
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  // process.env.SESS_SECRET
  secret: "secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
}; 

app.use(session(sess));

const helpers = require("./utils/helpers");
// // passing the helpers
const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// turn on routes
app.use(routes);


// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});