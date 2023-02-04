
"use strict"

const router = require("express").Router()
const { salary, get_salary } = require('../../controllers/Employ/Salary.controller')


router.post('/salary', salary)
router.get('/get_leave', get_salary)

module.exports = router;