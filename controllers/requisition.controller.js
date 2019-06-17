require('../models/requisition.model.js')
const mongoose = require('mongoose');
const Requisition = mongoose.model('requisition');

// Post requisitions
const postReq = (req, res) => {
    const newReq = new Requisition({
        itemName: req.body.name,
        itemModel: req.body.model,
        quantity: req.body.quantity
    })
    newReq.save((err) => {
        if (err) {
            res.send(err);
        } else {
            res.send('Requisition completed!');
        }
    })
}

// Read all requisitions
const readReqs = (req, res) => {
    Requisition.find()
        .exec()
        .then(reqs => {
            // res.status(200).json(reqs)
            res.status(200).render('tableReq', {
                reqs
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}

// Update requisition if it is completed (the id doesn't change)
const editReq = (req, res) => {
    const query = req.query // require: id, key=value
    const reqId = query.id
    delete query['id']

    Requisition.findByIdAndUpdate(reqId, query, {
            new: true
        })
        .then(req => {
            res.json({
                confirmation: 'success',
                data: req
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
    postReq,
    readReqs,
    editReq
}