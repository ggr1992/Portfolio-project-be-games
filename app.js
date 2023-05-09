const express = require("express");
const { manageCategories } = require("./controllers/categories.controllers");

const app = express()

app.use(express.json())



app.get('/api/categories', manageCategories)

app.use((req, res, next) => {
    res.status(404).send({msg: "Not Found!"})
  })



module.exports = app