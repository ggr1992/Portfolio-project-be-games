const { selectReviewPatch } = require("../models/8-patch-reviews.models")

exports.managePatchReviews = (request,response,next) => {
  
   const review_id = request.params.review_id
    const votes = request.body.inc_votes
    selectReviewPatch(votes,review_id).then((result) => { 
        response.status(200).send({review: result })
   })
   .catch(err => {
       next(err)
   })
}