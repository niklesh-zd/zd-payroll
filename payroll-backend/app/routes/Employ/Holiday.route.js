
"use strict"

const router = require("express").Router()
const { holiday, get_holiday, update_holiday, holiday_delete } = require('../../controllers/Employ/Holiday.controller')


router.post('/holiday', holiday)
router.post('/get_holiday', get_holiday)
router.get('/leave_update', update_holiday)
router.post('/holiday_dalate', holiday_delete)

module.exports = router;

