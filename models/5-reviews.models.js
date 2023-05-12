const connection = require('../db/connection')
const { forEach } = require('../db/data/test-data/categories')




exports.selectReview = () => {
      
    const selectingQuery = `
    SELECT reviews.designer, reviews.review_id, reviews.category, reviews.owner, reviews.review_img_url, reviews.title, reviews.votes, reviews.created_at ,COUNT(comments.comment_id) AS comment_count 
     FROM reviews       
    LEFT JOIN comments ON reviews.review_id = comments.review_id
    GROUP BY reviews.review_id
    ORDER BY reviews.created_at DESC;
    `
    return connection 
     .query(selectingQuery)
        .then((result) => {  
          return result.rows
    })

}