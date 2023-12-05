const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const loadModels = require("./config/faceapi");
const routes = require("./routes");

connectDB();

loadModels();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use("/uploads", express.static("uploads"));
app.set("views", path.join(__dirname, "../views/pages"));
app.set("view engine", "ejs");
app.use(require('./middleware/auth').userMiddleware);
app.use(routes);



app.listen(3000, () => {
  console.log("app is running in port 3000");
});
