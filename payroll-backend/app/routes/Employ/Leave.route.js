
"use strict"

const router = require("express").Router()
const { Leave, get_leave, get_user_id, leave_delete, update_laeve ,get_User_leave,get_user_leave_id} = require('../../controllers/Employ/Leave.cotroller')


router.post('/leave', Leave)
router.get('/get_leave', get_leave)
router.get('/get-user-id', get_user_id)
router.post('/get-user-leave/:id',get_user_leave_id)
router.post('/leave_dalete/:id', leave_delete)
router.post('/leave_update', update_laeve)
router.post('/get_User_leave', get_User_leave)


module.exports = router;

