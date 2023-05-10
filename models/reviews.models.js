const connection = require('../db/connection')

exports.selectReviewById = (reviewId) => {
    return connection 
    .query("SELECT * FROM reviews WHERE review_id = $1;", [reviewId])
    
    .then((result) => {
        if(result.rows.length === 0) {
            return Promise.reject({status: 400,msg: 'invalid review ID'})
        }
        return result.rows[0]
    })
    
};

