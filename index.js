const Joi = require("joi");
const express = require("express");
const app = express();

//course router
const course = require("./routes/course.route");
const home = require("./routes/home.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

//use route
app.use("/api/courses", course);
app.use("/", home);

let port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server is running on port ${port} .....`));
