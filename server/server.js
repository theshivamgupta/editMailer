/* eslint strict: 0 */
"use strict";

require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("passport");
const User = require("./model/user");
const session = require("express-session");
const cookieSession = require("cookie-session");
// const Template = require("./model/template");
const ShopifyStrategy = require("passport-shopify").Strategy;
const { findByEmail } = require("./controllers/user");
const { createTemplate } = require("./controllers/template");
const { getUserTemplates } = require("./controllers/user");

/* eslint new-cap: 0 */
// const app = express.Router();

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

// function findById(id, fn) {
//   User.findById(id, (err, user) => {
//     if (err || !user) {
//       fn(new Error(`User ${id} does not exist`));
//     }
//     fn(null, users[idx]);
//   });
// }

app.use(express.json());
// app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.set("trust proxy", 1);

app.use(
  cookieSession({
    name: "cookie_my",
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["supersecretkeys"],
  })
);

app.use(passport.initialize());
app.use(passport.session());
// app.use("/", router);

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => {
  // console.log("id ", id._id);
  User.findById(user._id, (err, doc) => {
    // Whatever we return goes to the client and binds to the req.user property
    console.log("doc ", doc);
    return done(null, doc);
  });
});

passport.use(
  // `shopify-${req.query.shop}`,
  new ShopifyStrategy(
    {
      clientID: process.env.SHOPIFY_CLIENT_ID,
      clientSecret: process.env.SHOPIFY_CLIENT_SECRET,
      callbackURL: `https://9de46daab558.ngrok.io/auth/shopify/callback`,
      shop: "editMailer",
    },
    (accessToken, refreshToken, profile, done) => {
      findByEmail(profile.emails[0].value, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user === null) {
          const newUser = User({
            name: profile.displayName,
            email: profile.emails[0].value,
            shopify_id: profile.id,
            domain: profile.profileUrl,
          });

          newUser.save((err, user) => {
            if (err) {
              console.log("err", err);
              return done(null, false, {
                message: `Unknown user with email ${profile.email}`,
              });
            }
          });
        }
        // console.log("user ", user);
        return done(null, user);
      });
    }
  )
);

app.get("/", (req, res) => {
  res.send(
    "visit http://localhost:4000/auth/shopify?shop=your-store-name to begin the auth"
  );
});

app.get("/successfull", (req, res) => {
  res.send("Sign In SUccessfull");
});

app.get(
  "/auth/shopify",
  passport.authenticate("shopify", { scope: ["read_orders"] })
);

app.get(
  "/auth/shopify/callback",
  passport.authenticate("shopify", {
    failureRedirect: "http://localhost:3000",
    session: true,
  }),
  function (req, res) {
    res.redirect("http://localhost:3000/logout");
  }
);

app.post("/create/template", createTemplate);
app.get("/users/all", getUserTemplates);

app.get("/getuser", (req, res) => {
  // return res.status(200).json(req.user);
  res.send(req.user);
});

app.listen(4000, () => {
  console.log("server started at http://localhost:4000");
});
