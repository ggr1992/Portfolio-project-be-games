const connection = require('../db/connection')

exports.insertComments = (body , author, review_id) => { 
    const instertQuery = `
    INSERT INTO comments(body,author,review_id)
    VALUES ($1, $2, $3) RETURNING *;
    `
    const inputValue = [body,author,review_id]
    return connection
    .query(instertQuery,inputValue)
    .then((result) => { 
     
              return result.rows[0]
      })
    }
  
    