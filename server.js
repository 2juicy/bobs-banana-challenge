const express = require("express");
const app = express();
// const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;

// app.use(bodyParser.urlencoded({ extended: true }));

require("./app/routes/apiRoutes.js")(app);

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
