
"use strict"

const router = require("express").Router()
const { Leave, get_leave ,get_user_id} = require('../../controllers/Employ/Leave.cotroller')


router.post('/leave', Leave)
router.get('/get_leave', get_leave)
router.get('/get-user-id',get_user_id)

module.exports = router;

