const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const bodyparser = require("body-parser");
require("dotenv").config();

const corsOptions = {
      origin: "*",
      credentials: true, //access-control-allow-credentials:true
      optionSuccessStatus: 200,
};
app.use(express.json());
app.use(cors(corsOptions));

app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
      );
      res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, DELETE, PATCH, OPTIONS"
      );
      next();
});

const db = require("./models");

// Routers
const planningRouter = require("./routes/Plannings");
app.use("/planning", planningRouter);

const employeesRouter = require("./routes/Employees");
app.use("/employee", employeesRouter);

const userRouter = require("./routes/Users");
app.use("/auth", userRouter);

app.use(bodyparser.json());
app.use(
      bodyparser.urlencoded({
            extended: true,
      })
);

db.sequelize.sync().then(() => {
      app.listen(process.env.PORT || 3001, () => {
            console.log("Server running on port 3001");
      });
});
