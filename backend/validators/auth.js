const {check} = require ('express-validator')

exports.userSignupValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required'),
    check('email')
        .isEmail()
        .withMessage('Must be a valid email address'),
        
    check('password')
        .isLength({ min:6})
        .withMessage('Password Must be atleast 6 Characters long') 
];

exports.userSigninValidator = [

    check('email')
        .isEmail()
        .withMessage('Must be a valid email address'),
        
    check('password')
        .isLength({ min:6})
        .withMessage('Password Must be atleast 6 Characters long') 
];