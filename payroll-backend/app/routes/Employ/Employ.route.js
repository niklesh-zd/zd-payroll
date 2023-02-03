
"use strict"

const router = require("express").Router()
const { add_employ, get_emlpoy, emp_delete, emp_update, get_one_emp, createUser, update_user } = require('../../controllers/Employ/EmpInfo.cotroller')
// const { validation_all_field } = require('../../controllers/Employ/validation')                                                                                                                                  
const { check } = require('express-validator');
const { Leave, get_salary } = require('../../controllers/Employ/Leave.cotroller')
router.post('/add_employ', [check('email').isEmail().normalizeEmail(),
check('First_Name', 'First_Name is required').not().isEmpty().isLength({ min: 3, max: 50 }),
check('Last_Name', 'Last_Name no is required').not().isEmpty().isLength({ min: 3, max: 50 }),
check('date_of_birth','date_of_birth is required').not().notEmpty(),
check('date_of_joining','date_of_joining is required ').not().notEmpty(),
check('Contact_Number_Home','Contact_Number_Home is required').not().isEmpty(),
check('Contact_Number' ,'Contact_Number is required').not().isEmpty(),
// check('Permanent_Address ',' Permanent_Address is required').not().isEmpty(),
check('fatherName','fatherName is required').not().isEmpty(),
check('Nationality','Nationality is required').not().isEmpty(),
check('PAN_No','PAN_No is required').not().isEmpty(),
check('ADHAR','ADHAR  is valid').not().isEmpty().isLength({ min: 12, max: 12 },'invalid adhar number'),
check('Bank_No','Bank_No is required').not().isEmpty()
], add_employ)
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
router.post('/leave', Leave)
module.exports = router;

