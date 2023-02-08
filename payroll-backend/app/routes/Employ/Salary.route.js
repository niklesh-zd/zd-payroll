
"use strict"

const router = require("express").Router()
const { salary, get_salary, update_salary,salary_delete ,get_salary_id} = require('../../controllers/Employ/Salary.controller')


router.post('/salary', salary)
router.get('/get_salary', get_salary)
router.post('/update/:id', update_salary)
router.post('/delete_salary/:id', salary_delete)
router.get('/get_salary_id',get_salary_id)


module.exports = router;