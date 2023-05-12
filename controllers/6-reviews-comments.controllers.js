const { selectReviewByComments } = require("../models/6-reviews-comments")

exports.manageReviewsByComments = (request,response,next) => {
    const reviewId = request.params.review_id
   
    selectReviewByComments(reviewId).then((result) => { 
        return response.status(200).send({'comments': result})
        
   })
   .catch(err => {
       next(err)
   })
}