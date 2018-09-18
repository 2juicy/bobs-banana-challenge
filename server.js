const express = require("express");
const app = express();

const PORT = 3000;

require("./app/routes/apiRoutes.js")(app);

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
