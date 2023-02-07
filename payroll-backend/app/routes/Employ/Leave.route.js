
"use strict"

const router = require("express").Router()
const { Leave, get_leave, get_user_id, leave_delete, update_laeve } = require('../../controllers/Employ/Leave.cotroller')


router.post('/leave', Leave)
router.get('/get_leave', get_leave)
router.get('/get-user-id', get_user_id)
router.post('/leave_dalate', leave_delete)
router.post('/leave_update', update_laeve)

module.exports = router;

