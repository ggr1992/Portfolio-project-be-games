const connection = require('../db/connection')

exports.insertComments = ({author , body}) => {

    const instertQuery = `
    INSERT INTO comments (author, body)
    VALUES ($1, $2) returning *;
    `

    const inputValue = ['author', 'body']
    return connection 
     .query(instertQuery,inputValue)
        .then((result) => {  
        
          return result.rows[0]
    })
}