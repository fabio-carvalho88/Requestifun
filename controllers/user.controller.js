require('../models/user.model.js')
const mongoose = require('mongoose');
const User = mongoose.model('user');

const readUsers = (req, res) => {
    User.find({})
        .exec()
        .then(docs => {
            res.status(200).json({
                confirmation: 'success',
                data: docs
            });
        })
        .catch(err => {
            res.json({
                confirmation: 'fail',
                message: err.message
            })
        })
}

const readUsersId = (req, res) => {
    const id = req.params.id;

    User.findById(id)
        .exec()
        .then(docs => {
            res.json({
                confirmation: 'success',
                data: docs
            })
        })
        .catch(err => {
            res.json({
                confirmation: 'fail',
                message: err.message
            })
        })
}

const editUsers = (req, res) => {
    const query = req.query // require: id, key=value
    const userId = query.id
    delete query['id']

    User.findByIdAndUpdate(userId, query, {
            new: true
        })
        .then(user => {
            res.json({
                confirmation: 'success',
                data: user
            })
        })
        .catch(err => {
            res.json({
                confirmation: 'fail',
                message: err.message
            })
        })
}

const tableUsers = (req, res) => {
    console.log("entrei na table")
    // let db = req.db;
    // let collection = db.get('users');
    // collection.find({
    //     active: true
    // }, (e, docs) => {
    //     res.render('tableUsers', {
    //         'tableUsers': docs
    //     })
    // })
}

// If the User got banned from the app, for example
const deleteLogicUsers = (req, res) => {
    User.findOneAndUpdate({
        _id: req.params.id
    }, {
        status: false
    }, (err) => {
        if (err) res.send(err)
        else res.send("O utilizador foi desativado.")
    })
}

// Reactivate User
const reactivateLogicUsers = (req, res) => {
    User.findOneAndUpdate({
        _id: req.params.id
    }, {
        status: true
    }, (err) => {
        if (err) res.send(err)
        else res.send("O utilizador foi reativado.")
    })
}

module.exports = {
    readUsers,
    readUsersId,
    editUsers,
    tableUsers,
    deleteLogicUsers,
    reactivateLogicUsers
}