const {selectCategories} = require('../models/categories.models')

exports.manageCategories = (request, response) => {
    selectCategories().then((result) => {
         return response.status(200).send({'categories': result.rows})
         
    })
    .catch(err => {
        console.log(err)
    })
}