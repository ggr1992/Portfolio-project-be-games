const connection = require('../db/connection')

exports.selectReview = () => {
    return connection 
        .query('SELECT * FROM reviews;')
        .then((result) => {
             return result.rows;
    })
}