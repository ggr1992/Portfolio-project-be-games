const connection = require('../db/connection')

exports.insertComments = (body , author, review_id) => {

  
    console.log(body,'<<< in model 1')
    console.log(author, "<<< in model 2")
    console.log(review_id, "<<< in model 3")
    
    // add all categories to test suite make sure we just return the 2 we need after adding review id extracted from string 

    const instertQuery = `
    INSERT INTO comments (author, body)
    VALUES ($1, $2) RETURNING *;
    `

    const inputValue = [author, body]
    return connection 
     .query(instertQuery,inputValue)
        .then((result) => {  
          console.log(result)
            return result.rows[0]
    })
}