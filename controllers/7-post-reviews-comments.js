const { insertComments } = require("../models/7-post-reviews-comments")

exports.managePostReview = (request,response,next) => {
    
    const reviewUser = request.params.review_id
    
    const comment = request.body.body
    const user = request.body.author
    insertComments(comment,user,reviewUser).then((result) => {
        response.status(201).send({comment: result })
    })
    .catch(err => {
        next(err)
    })
}