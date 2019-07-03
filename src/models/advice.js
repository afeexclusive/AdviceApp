const mongoose = require('mongoose');

const adviceSchema = mongoose.Schema({
    parentId: String,
    category: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('advice', adviceSchema);