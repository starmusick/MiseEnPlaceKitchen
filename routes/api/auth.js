const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

//User Model
const User = require('../../models/User');

// @route POST api/auth
// @desc Auth user
// @access Public

router.post('/', (req, res) => {
    const { user_email, user_password } = req.body;

    //Simple validation
if(!user_email || !user_password) {
    return res.status(400).json({ msg: 'Please enter all fields'});
}

// Check for existing user
User.findOne({ user_email })
    .then(user => {
        if(!user) return res.status(400).json({ msg: 'User does not exist'});

        // Validate password
        bcrypt.compare(user_password, user.user_password)
            .then(isMatch => {
                if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials'});

                jwt.sign(
                    { id: user.id },
                    config.get('jwtSecret'),
                    { expiresIn: 3600 },
                    (err, token) => {
                        if(err) throw err;
                        res.json({
                            token,
                            user: {
                                id: user.id,
                                email: user.user_email,
                                name: user.user_name,
                                category: user.user_category
                            }
                        });       
                    }
                )
            })

    })
});

// @route GET api/auth/user
// @desc Get user data
// @access Private

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-user_password')
        .then(user => res.json(user));
});



module.exports = router;