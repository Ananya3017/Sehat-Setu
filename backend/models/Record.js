const mongoose = require('mongoose');

const recordSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            required: [true, 'Please add a record name'],
        },
        type: {
            type: String,
            required: [true, 'Please add a record type'],
        },
        date: {
            type: String,
            required: [true, 'Please add a record date'],
        },
        size: {
            type: String,
            default: 'Unknown Size',
        },
        doc: {
            type: String,
            required: [true, 'Please add a doctor/hospital name'],
        },
        blockchainHash: {
            type: String,
            required: [true, 'Blockchain hash is generating...'],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Record', recordSchema);
