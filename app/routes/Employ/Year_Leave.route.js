
"use strict"

const router = require("express").Router()
const { year_leave, get_year_leave } = require('../../controllers/Employ/Year_leave.controller')
router.post('/year-leave', year_leave)
router.post('/get_year_leave', get_year_leave)
module.exports = router;