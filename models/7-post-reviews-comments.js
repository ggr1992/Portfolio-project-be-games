const connection = require('../db/connection')

exports.insertComments = (body , author,votes,createdAt, review_id) => { 
    const instertQuery = `
    INSERT INTO comments(body,votes,author,review_id,created_at)
    VALUES ($1, $2, $3, $4, $5) RETURNING author AS username,body;
    `

    const inputValue = [body,votes,author,review_id,createdAt]
    
    return connection
    .query(`SELECT * FROM comments
    WHERE author = '${author}';
    `)
    .then((result) => {
      return result.rows
    })
    .then((result) => {
      if(result.length >= 1) {
        return connection 
       .query(instertQuery,inputValue)
          .then((result) => { 
              return result.rows[0]
      })
  
      } else {
        return Promise.reject({status:404,msg: "Not Found!"})
      }
      
    })
}