const { selectReview } = require("../models/5-reviews.models")

exports.manageReviews = (request,response,next) => {
    const {sort_by, order} = request.query
   
    selectReview(sort_by, order).then((result) => { 
        return response.status(200).send({'reviews': result})
        
   })
   .catch(err => {
       next(err)
   })
}
