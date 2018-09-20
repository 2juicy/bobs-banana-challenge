const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3000;

require("./app/routes/apiRoutes.js")(app);
require("./app/routes/htmlRoutes.js")(app);

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
