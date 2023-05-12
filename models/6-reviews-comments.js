const connection = require('../db/connection')

exports.selectReviewByComments = (review_id) => {
    const selectingQuery = `
    SELECT comment_id,votes,created_at,author,body,review_id
     FROM comments
     WHERE review_id = $1
     ORDER BY created_at DESC;  
    `
    return connection 
     .query(selectingQuery,[review_id])
        .then((result) => {  
            if(result.rows.length === 0){
                return Promise.reject({status: 404, msg: 'Not Found!'})
            }
            
          return result.rows
    })

}