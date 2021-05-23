require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
// const cors = require("cors");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const User = require("./model/user");
const ShopifyStrategy = require("passport-shopify").Strategy;
const { getUserTemplates } = require("./controllers/user");
const {
  getTemplateById,
  createTemplate,
  updateTemplateById,
} = require("./controllers/template");

const app = express();
let requestUser = {};
mongoose.connect(
  process.env.DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to mongoose successfully");
  }
);

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// app.set("trust proxy", 1);

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
    cookie: {
      // sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // One Week
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  return done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, doc) => {
    // Whatever we return goes to the client and binds to the req.user property
    return done(null, doc);
  });
});

passport.use(
  new ShopifyStrategy(
    {
      clientID: process.env.SHOPIFY_CLIENT_ID,
      clientSecret: `${process.env.SHOPIFY_CLIENT_SECRET}`,
      callbackURL: "https://e1125f831bde.ngrok.io/auth/shopify/callback",
      shop: "editMailer",
    },
    function (_, __, profile, cb) {
      User.findOne({ shopify_id: profile.id }, async (err, doc) => {
        if (err) {
          return cb(err, null);
        }
        // console.log("doc ", doc);
        if (!doc) {
          const newUser = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            shopify_id: profile.id,
            domain: profile.profileUrl,
          });

          await newUser.save();
          cb(null, newUser);
        }
        cb(null, doc);
      });
    }
  )
);

app.get(
  "/auth/shopify",
  passport.authenticate("shopify", { scope: ["read_orders"] })
);

app.get(
  "/auth/shopify/callback",
  passport.authenticate("shopify", {
    failureRedirect: "http://localhost:3000/",
    session: true,
  }),
  function (req, res) {
    requestUser = req.user;
    res.redirect("http://localhost:3000/dashboard");
    // res.send({ msg: "successfull", user: req.user });
    // res.send(req.user);
  }
);

app.get("/", (req, res) => {
  res.send("Hello WOlrd");
});

app.get("/getuser", (req, res) => {
  // console.log(requestUser);
  res.send(requestUser);
});

app.get("/auth/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.send("done");
  }
});

app.get("/users/all/:id", getUserTemplates);
app.post("/create/template", createTemplate);
app.post("/update/template", updateTemplateById);
app.get("/template/get/:id", getTemplateById);

app.listen(process.env.PORT || 4000, () => {
  console.log("Server Starrted");
});
