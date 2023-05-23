const connection = require('../db/connection')

exports.insertComments = (body , author, review_id) => { 
console.log(body)
    const instertQuery = `
    INSERT INTO comments(body,author,review_id)
    VALUES ($1, $2, $3) RETURNING *;
    `
    const inputValue = [body,author,review_id]
    return connection
    .query(instertQuery,inputValue)
    .then((result) => { 
      console.log(result)
              return result.rows[0]
      })
    }
    

// if object is missing information 400 
// if review id is not a number should be 400
// 404 for if user does not exist prom psql error