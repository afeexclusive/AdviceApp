const mongoose = require('mongoose');

const adviceSchema = mongoose.Schema({
    parentId: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('reply', adviceSchema);