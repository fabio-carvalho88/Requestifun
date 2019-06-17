const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    stock: {
        type: String,
        required: true
    },
    urlImage: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    }
});

const Item = mongoose.model('item', ItemSchema);
module.exports = Item;