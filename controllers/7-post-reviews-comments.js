const { insertComments } = require("../models/7-post-reciews-comments")

exports.managePostReview = (request,response) => {
    insertComments(request.body)
}