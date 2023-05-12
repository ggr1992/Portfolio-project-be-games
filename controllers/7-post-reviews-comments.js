const { insertComments } = require("../models/7-post-reviews-comments")

exports.managePostReview = (request,response) => {
    console.log(request.body)
    insertComments({comments:request.body})
}