const express = require("express");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require('passport');
const User = require("../models/user");

const router = express.Router();


require('./passport-config');
router.use(passport.initialize());
router.use(passport.session());

router.post("/signup", function (req,res, next) {
  addToDB(req, res);
});


async function addToDB(req, res){
  var user = new User({
    email: req.body.email,
    password: User.hashPassword(req.body.password),
    role: req.body.role,
    registrationDate: new Date(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  try{
    doc = await user.save();
    return res.status(201).json(doc);
  }catch(err){
    return res.status(501).json(err);
  }
}

router.post('/login',function(req,res,next){
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user){
        return res.status(401);
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then( result => {
      if(!result){
        return res.status(401);
      }
      const token = jwt.sign({email: fetchedUser.email,
        userId: fetchedUser._id},
        'secretstuff',
        {expiresIn: "1h"});
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
        userName: fetchedUser.firstName,
        message: "Success"
      });
    })
    .catch(err => {
      return res.status(401);
    })
});

router.get("/:id", (req, res, next) => {
  let loggedInUser;
  User.findById(req.params.id).then(user => {
    if (user) {
      loggedInUser = user;
      console.log(loggedInUser);
      res.json({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        image: user.image,
        jobTitle: user.jobTitle
      });
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  });
});

router.get('/', isValidUser, function(req, res, next){
  return res.status(200).json(req.user);
});

function isValidUser(req, res, next){
  if(req.isAuthenticated()) next();
  return res.status(401).json({message: 'Invalid request'});
}

router.get('/logout', isValidUser, function(req, res, next){
  req.logout();
  return res.status(200).json({message: "Logged out!"});
})

module.exports = router;
