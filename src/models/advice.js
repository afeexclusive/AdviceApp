const mongoose = require('mongoose');

const adviceSchema = mongoose.Schema({
    same: String,
    parentId: String,
    category: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('advice', adviceSchema);