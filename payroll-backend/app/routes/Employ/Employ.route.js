
"use strict"

const router = require("express").Router()
const { add_employ, get_emlpoy, emp_delete, emp_update, get_one_emp, createUser, update_user } = require('../../controllers/Employ/EmpInfo.cotroller')
// const { validation_all_field } = require('../../controllers/Employ/validation')                                                                                                                                  
const { check } = require('express-validator');
const { Leave, get_salary } = require('../../controllers/Employ/Leave.cotroller')
router.post('/add_employ', add_employ)
router.get('/get_employ', get_emlpoy)
router.post('/delete_emp/:id', emp_delete)
router.post('/update/:id', emp_update)
router.get('/emp_1/:id', get_one_emp)
// router.post('/post_some_data', createUser, validation_all_field)
// route.route('/post_some_data').post(validateUser, createUser);
router.post('/post_some_data',
    [check('email').isEmail().normalizeEmail(),
    check('name', 'Name is requied').not().isEmpty().isLength({ min: 3, max: 50 }),
    check('phone', 'phone no is requied').isLength({ min: 10, max: 10 })],
    createUser);
router.post('/user_update', update_user)
router.post('/leave',Leave)
module.exports = router;

