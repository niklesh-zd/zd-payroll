
"use strict"

const router = require("express").Router()
const { Leave, get_leave } = require('../../controllers/Employ/Leave.cotroller')


router.post('/leave', Leave)
router.get('/get_leave', get_leave)


module.exports = router;

