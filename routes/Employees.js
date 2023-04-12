const express = require("express");
const router = express.Router();
const { Employees } = require("../models");
const { validateToken } = require("../middlewares/Auth");
const path = require("path");
const fs = require("fs");

router.get("/", validateToken, async (req, res) => {
      const listOfEmployees = await Employees.findAll({
            order: [["id", "ASC"]],
      });
      res.json({
            listOfEmployees: listOfEmployees,
      });
});

module.exports = router;
