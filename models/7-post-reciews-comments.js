const connection = require('../db/connection')

exports.insertComments = ({author , body}) => {

    const instertQuery = `
    INSERT INTO comments (author, body)
    VALUES
    `
    return connection 
     .query(instertQuery)
        .then((result) => {  
          return result.rows
    })
}