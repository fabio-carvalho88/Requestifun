require('../models/item.model.js')
const mongoose = require('mongoose');
const Item = mongoose.model('item');


// Add new Item with the data inserted in the form page
const postItem = (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        model: req.body.model,
        stock: req.body.stock,
        urlImage: req.body.url,
        category: req.body.category,
        subCategory: req.body.subcategory
    })
    newItem.save((err) => {
        if (err) {
            res.send(err);
        } else {
            res.send("Item added with sucess!")
        }
    })
}

// Fetch all Items and show them in the catalog
const readItems = (req, res) => {
    Item.find()
        .exec()
        .then(items => {
            // console.log(items);
            res.status(200).render('catalog', {
                items
            })
            // console.log(items);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

// Read Item by ID
const readItemId = (req, res) => {
    const id = req.params.id;

    Item.findById(id)
        .then(item => {
            res.json({
                confirmation: 'success',
                data: item
            })
        })
        .catch(err => {
            res.json({
                confirmation: 'fail',
                message: 'Item with ' + id + ' not found.'
            })
        })
}

// Edit Item by ID, doesn't change the ID 
const editItem = (req, res) => {
    const query = req.query // require: id, key=value
    const itemId = query.id
    delete query['id']

    Item.findByIdAndUpdate(itemId, query, {
            new: true
        })
        .then(item => {
            res.json({
                confirmation: 'success',
                data: item
            })
        })
        .catch(err => {
            res.json({
                confirmation: 'fail',
                message: err.message
            })
        })
}

// Delete item by his own ID
const removeItem = (req, res) => {
    const query = req.query
    Item.findByIdAndRemove(query.id)
        .then(data => {
            res.json({
                confirmation: 'success',
                data: 'Item ' + query.id + ' successfully removed.'
            })
        })
        .catch(err => {
            res.json({
                confirmation: 'fail',
                message: err.message
            })
        })
}


module.exports = {
    readItems,
    postItem,
    readItemId,
    editItem,
    removeItem
}