const express = require("express");
const { manageCategories } = require("./controllers/categories.controllers");
const { manageEndpoints } = require("./controllers/api.controllers");
const { manageReviews } = require("./controllers/5-reviews.controllers");

const app = express()

app.use(express.json())

app.get('/api/',manageEndpoints)


app.get('/api/categories', manageCategories)

app.get('/api/reviews', manageReviews)


app.use((req, res, next) => {
    res.status(404).send({msg: "Not Found!"})
  })



module.exports = app