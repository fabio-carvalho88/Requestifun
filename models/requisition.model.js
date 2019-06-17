const mongoose = require('mongoose');


const RequisitionSchema = new mongoose.Schema({
    reqDate: {
        type: Date,
        default: Date.now
    },
    returnDate: {
        type: Date,
        default: new Date(+new Date() + 3 * 24 * 60 * 60 * 1000) // Deadline for delivery, 3 days from today
    },
    itemName: {
        type: String,
        require: true,
    },
    itemModel: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    itemStatus: {
        type: String,
        enum: ["excelente", "bom", "mau", "péssimo"],
        default: "excelente"
    },
    reqStatus: {
        type: String,
        enum: ["ativo", "concluída"],
        default: "ativo"
    },
});

const Requisition = mongoose.model('requisition', RequisitionSchema);
module.exports = Requisition;