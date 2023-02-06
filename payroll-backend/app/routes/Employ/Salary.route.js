
"use strict"

const router = require("express").Router()
const { salary, get_salary, update_salary } = require('../../controllers/Employ/Salary.controller')


router.post('/salary', salary)
router.get('/get_salary', get_salary)
router.post('/update/:id', update_salary)

module.exports = router;