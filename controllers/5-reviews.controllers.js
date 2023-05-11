const { selectReview } = require("../models/5-reviews.models")

exports.manageReviews = (request,response,next) => {
    selectReview().then((result) => { 
        return response.status(200).send({'reviews': result})
        
   })
   .catch(err => {
       console.log(err)
   })
}
