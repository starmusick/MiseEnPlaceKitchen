const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
    item_id: {
        type: Number,
        require: true
    },
    item_name: {
        type: String,
        require: true
    },
    item_detail: {
        type: String,
        require: false
    },
    item_price: {
        type: Number,
        require: true
    },
    item_category: {
        type: Array,
        require: true
    },
    item_created: {
        type: Date,
        default: Date.now
    }
});

module.exports = Item = mongoose.model('item', ItemSchema);