const connection = require('../db/connection')

exports.selectReviewById = (reviewId) => {
    return connection 
    .query(`SELECT * FROM reviews WHERE reviews.review_id = ($1);`, [reviewId])
    
    .then((result) => {
        if(result.rows.length === 0) {
            return Promise.reject({status: 404, msg: 'Not Found!'})
        }
        return result.rows[0]
    })
    
};

