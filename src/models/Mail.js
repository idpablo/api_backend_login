const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/potifolio')

const  mailSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

const Mail = mongoose.model('Mail', mailSchema);

module.exports = Mail;