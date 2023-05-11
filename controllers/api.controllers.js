const endPointData = require("../endpoints.json")

exports.manageEndpoints = (request, response) => {
    return response.status(200).send(endPointData);
}
