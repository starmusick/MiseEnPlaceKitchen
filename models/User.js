const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    user_email: {
        type: String,
        require: true,
        unique: true
    },
    user_name: {
        type: String,
        require: false
    },
    user_password: {
        type: String,
        require: true
    },
    user_category: {
        type: Array,
        require: true
    },
    user_created: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);