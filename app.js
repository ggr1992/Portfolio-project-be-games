const express = require("express");
const { manageCategories } = require("./controllers/categories.controllers");
const { manageReviewsById } = require("./controllers/reviews.controllers");
const { manageEndpoints } = require("./controllers/api.controllers");
const { manageReviewsByComments } = require("./controllers/6-reviews-comments.controllers");
const { manageReviews } = require("./controllers/5-reviews.controllers");
const { managePostReview } = require("./controllers/7-post-reviews-comments");

const app = express()

app.use(express.json())

app.get('/api', manageEndpoints)

app.get('/api/categories', manageCategories)

app.get('/api/reviews', manageReviews)

app.get("/api/reviews/:review_id", manageReviewsById);

app.post('/api/reviews/:review_id/comments',managePostReview)

app.get('/api/reviews/:review_id/comments',manageReviewsByComments)
app.use((error,req, res, next) => {
  if (error.code === '22P02') {
    res.status(400).send({msg: "Bad request!"})
  } else {
    next(error)
  }
})


app.use((error,req, res, next) => {
  if(error.status && error.msg) {
    res.status(error.status).send({msg: error.msg })
  } else {
    next(error)
  }
})

app.use((req, res, next) => {
    res.status(404).send({msg: "Not Found!"})
  })
  


module.exports = app