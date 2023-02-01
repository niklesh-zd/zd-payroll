
"use strict"

const router = require("express").Router()
const { Leave, get_salary } = require('../../controllers/Employ/Leave.cotroller')


router.post('/leave', Leave)
router.get('/get_salary', get_salary)


module.exports = router;

