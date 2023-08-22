const User = require('../models/user');
const shortId = require('shortid');
const jwt = require('jsonwebtoken'); // Use jwt for jsonwebtoken
const expressJwt = require('express-jwt');

exports.signup = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email }).exec();
        if (existingUser) {
            return res.status(400).json({
                error: 'Email is taken'
            });
        }

        const { name, email, password } = req.body;
        const username = shortId.generate();
        const profile = `${process.env.CLIENT_URL}/profile/${username}`;

        const newUser = new User({ name, email, password, profile, username });
        await newUser.save();
        res.json({
            message: 'Signup success! Please signin.'
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).exec();
        if (!user || !user.authenticate(password)) {
            return res.status(400).json({
                error: 'Invalid email or password.'
            });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, { expiresIn: '1d' });
        const { _id, username, name, role } = user;
        res.json({
            token,
            user: { _id, username, name, role }
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.signout = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: 'Signout success'
    });
};

// exports.requireSignin = expressJwt({
//     secret: process.env.JWT_SECRET
// });

exports.sigin = (req, res) => {
    const {email, password} = req.body
    //check if user exist 
    User.findOne({email}).exec((err, user) =>{
        if(err || !user){
            return res.status(400).json({
                error: 'User with that email does not exist . Please signup. '
            });
        }
        // authenticate
        if(!user.authentiate(password)) {
            return res.status(400).json({
                error: 'Email and password do not match '
            });
        }
        //generate a token and sent to client 
        const token =jwt.sign({_id: user._id}, process.env.JWT_SECRET, { expiresIn: '1d'});
        res.cookie('token', token, {expiresIn: '1d'})
        const {_id, username, name, email, role} = user
        return res.json({
            token,
            user: {_id, username, name, email, role}
        });
    });
    
}

exports.signout = (req, res) =>{
    res.clearCookie("token")
    res.json({
        message: "Signout success"
    });
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'], // Specify the algorithm used for JWT signing
    userProperty: 'auth',  // Name of the property where JWT payload will be attached
});
