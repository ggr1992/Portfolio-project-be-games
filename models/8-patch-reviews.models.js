const connection = require('../db/connection')

exports.selectReviewPatch = (votes,review_id) => {
    const query = `
    UPDATE reviews 
    SET votes = votes + ($1)
    WHERE review_id = ($2)
    returning  title,designer,owner,review_img_url,review_body,category,created_at,votes;`

    const inputValue = [votes,review_id]

    return connection
    .query(query,inputValue)
        .then((result)=> {
            if(result.rows.length === 0){
                return Promise.reject({status: 404, msg: 'Not Found!'})
            }
            return result.rows[0]
        })
}