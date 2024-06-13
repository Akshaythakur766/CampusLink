const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique:true
    },
    code: {
        type: String,
        unique: true
    },
    Used: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
    }
});

const CodeModel = new mongoose.model("Staff", Schema);

module.exports = CodeModel;
