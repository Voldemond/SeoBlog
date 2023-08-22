// const express = require('express');
// const router = express.Router();
// const { signup } = require('../controllers/auth');
// const { runValidation } = require('../validators');
// const { userSignupValidator } = require('../validators/auth');

// // The problematic line causing the error is likely here
// router.post('/signup', userSignupValidator, runValidation, signup);

// module.exports = router;
//-------------------------------------------------------------------------------------

// const express = require('express')
// const router = express.Router()
// const {time} = require('../controllers/auth');

// router.post('/signup', signup)

// module.exports = router;
//-------------------------------------------------------------------------------------
const express = require('express');
const router = express.Router();
const { signup, signin, signout, requireSignin} = require('../controllers/auth'); // Fix the import statement

//validators
const {runValidation} = require('../validators');
const {userSignupValidator, userSigninValidator} = require('../validators/auth');

//router.post('/signup', userSignupValidator, runValidation, signup);
 router.post('/signup',userSignupValidator, runValidation, signup);
 router.post('/signin',userSigninValidator, runValidation, signin);
 router.get('/signout', signout);

 //test
 router.get('/secret', requireSignin ,(req, res) => {
    res.json({
        message: 'you have access to secret page'
    });
 })
module.exports = router;

