const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: String,
    description: String,
    imgUrl: String,
    url: String
});

module.exports = mongoose.model('project', projectSchema);