const app = require("./app");
const {PORT = 9090} = process.env;

app.listen(PORT , (error) => {
    console.log(`listening on port ${PORT} `) 
})