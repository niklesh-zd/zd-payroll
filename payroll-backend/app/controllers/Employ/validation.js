const { check } = require('express-validator');

exports.signupValidation = (userData) => {
    const errors = [];
    if (check('name', 'Name is requied').not().isEmpty().isLength({ min: 2, max: 50 })) {
        errors["name"] = 'name is requied';
    }
    if (check('email', 'email is requied').not().isEmpty()) {
        errors["email"] = 'email is requied';
    }
    if (check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true })) {
        errors["email"] = 'Please include a valid email';
    }
    if (check('phone', 'phone is requied').not().isEmpty()) {
        errors["phone"] = 'phone is requied';
    }
    //check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    //check({ 'phone': 'phone1 is requird' }).not().isEmpty(),
    // check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    // check('date_of_birth', 'date_of_birth is requird').not().isEmpty(),
    // check('date_of_joining', 'date_of_joining is requird').not().isEmpty(),
    // check('gender', 'gender is requird').not().isEmpty(),
    // check('address', 'address is required').not().isEmpty(),
    // check('fatherName', 'fatherName is required').not().isEmpty().isLength({ min: 2, max: 50 }),
    return errors
}

exports.validation_all_field = [
    check('name', 'Name is requied').not().isEmpty().isLength({ min: 2, max: 50 }),
    check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('phone', 'phone no is requied').isLength({ min: 10, max: 10 }),
]
