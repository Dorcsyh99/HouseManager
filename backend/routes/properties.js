const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
var url = require("url");

const checkAuth = require("../middleware/check-auth");

const Property = require("../models/property");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});
router.post(
  "",
  checkAuth,
  multer({storage: storage}).single('image'),
  (req,res,next) => {
    console.log(req.headers);
    const url = req.protocol + "://" + req.get("host");
    const prop = new Property({
      city: req.body.city,
      city2: req.body.city2,
      address: req.body.address,
      type: req.body.type,
      size: req.body.size,
      condition: req.body.condition,
      price: req.body.price,
      year: req.body.year,
      parking: req.body.parking,
      numberOfRooms: req.body.numberOfRooms,
      furnitured: req.body.furnitured,
      elevator: req.body.elevator,
      level: req.body.level,
      garden: req.body.garden,
      attic: req.body.attic,
      pet: req.body.pet,
      smoke: req.body.smoke,
      heatingType : req.body.heatingType,
      creator: req.userData.userId,
     // image: url + "/images/" + req.file.filename
    });
    prop.save().then(updatedProperty => {
      console.log(updatedProperty);
      res.status(201).json({
        message: "Post added successfully",
        prop: {
          ...updatedProperty,
          id: updatedProperty._id
        }
      });
    });
  }
);

router.put(
  "/:id",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }
    const prop = new Property({
      _id: req.body.id,
      city: req.body.city,
      city2: req.body.city2,
      address: req.body.address,
      type: req.body.type,
      size: req.body.size,
      condition: req.body.condition,
      year: req.body.year,
      parking: req.body.parking,
      numberOfRooms: req.body.numberOfRooms,
      furnitured: req.body.furnitured,
      elevator: req.body.elevator,
      level: req.body.level,
      garden: req.body.garden,
      attic: req.body.attic,
      pet: req.body.pet,
      smoke: req.body.smoke,
      heatingType : req.body.heatingType,
      creator: req.userData.userId
    });
    console.log(prop);
    Property.updateOne({ _id: req.params.id, creator: req.userData.userId }, prop).then(result => {
      if (result.nModified > 0){
        res.status(200).json({ message: "Update successful!" });
      } else{
        res.status(401).json({ message: "Not authorized!" });
      }
    });
  }
);

router.get("/search", (req, res, next) => {
  const reqCity = req.query.city;
  const query = Property.find({city: reqCity});
  let searchResults;
  query.then(documents => {
    searchResults = documents;
    return Property.count();
  }).then(count => {
    res.status(200).json({
      message: "Success",
      props: searchResults,
      maxResults: count
    });
  });
});

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const propQuery = Property.find();
  let fetchedProps;
  if (pageSize && currentPage) {
    propQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  propQuery
    .then(documents => {
      fetchedProps = documents;
      return Property.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Properties fetched successfully!",
        props: fetchedProps,
        maxProps: count
      });
    });
});

router.get("/:id", (req, res, next) => {
  Property.findById(req.params.id).then(prop => {
    if (prop) {
      res.status(200).json(prop);
    } else {
      res.status(404).json({ message: "Property not found!" });
    }
  });
});

router.delete("/:id", checkAuth, (req, res, next) => {
  Property.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
    if (result.nModified > 0){
      res.status(200).json({ message: "Update successful!" });
    } else{
      res.status(401).json({ message: "Not authorized!" });
    }
  });
});

module.exports = router;
