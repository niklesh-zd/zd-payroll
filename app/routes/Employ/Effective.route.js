"use strict"

const router = require("express").Router()
const { effective_date_, get_eff} = require('../../controllers/Employ/Effective.controller')
router.post('/effective_date_', effective_date_)
router.get('/get_effective', get_eff)
module.exports = router;