
"use strict"

const router = require("express").Router()
const { holiday, get_holiday, update_holiday, holiday_delete,get_Holiday_all } = require('../../controllers/Employ/Holiday.controller')


router.post('/holiday', holiday)
router.post('/get_holiday', get_holiday)
router.get('/leave_update', update_holiday)
router.post('/holiday_dalate', holiday_delete)
router.get('/get-holiday',get_Holiday_all)
module.exports = router;

