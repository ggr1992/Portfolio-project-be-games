const { selectReviewById } = require("../models/reviews.models")

exports.manageReviewsById = (request, response,next) => {
    const reviewId   = request.params.review_id
   
    selectReviewById(reviewId).then((review) => {
         return response.status(200).send({review})
         
    })
    .catch(err => {
        next(err)
    })
}