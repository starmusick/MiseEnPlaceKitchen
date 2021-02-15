const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//User Model
const User = require('../../models/User');

// @route GET api/users
// @desc Get All Users
// @access Public

router.post('/', (req, res) => {
    const { user_email, user_name, user_password, user_category } = req.body;

    //Simple validation
if(!user_email || !user_name || !user_password || !user_category) {
    return res.status(400).json({ msg: 'Please enter all fields'});
}

// Check for existing user
User.findOne({ user_email })
    .then(user => {
        if(user) return res.status(400).json({ msg: 'This user already exists'});
        const newUser = new User({
            user_email,
            user_name,
            user_password, 
            user_category
        });
        // Create salt & hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.user_password, salt, (err, hash) => {
                if(err) throw err;
                newUser.user_password = hash;
                newUser.save()
                    .then(user => {
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
                    });
            })
        })
    })
});


module.exports = router;