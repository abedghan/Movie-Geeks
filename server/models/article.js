const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const Schema = mongoose.Schema;
require('dotenv').config();



const articleSchema = mongoose.Schema({
    title: {
        type: String,
        maxlength: 200,
        required: [true, 'You need a title'],
    },
    content: {
        type: String,
        required: [true, 'You need some content'],
        maxlength:10000,
    },
    excerpt: {
        type: String,
        required: [true, 'Please add an excerpt'],
        maxLength: 500,
    },
    photo:{
        type: String,
        required:false
    },
    createdBy:{
        type: String,
        required:false,
        default:'Unknown'
    },
    score: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    actors: {
        type: [String],
        required: true,
        validate: {
            validator: function (array) {
                return array.length >= 2
            },
            message: "You must add at least three"
        }
    },
    status: {
        type: String,
        required: true,
        enum: ['draft', 'public'],
        default: 'draft',
        index: true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required: true,
        default: '630e6b6edf6676711dee50dc'
    },
    date: {
        type: Date,
        default: Date.now
    }

});
articleSchema.plugin(aggregatePaginate)

const Article = mongoose.model('Article', articleSchema)
module.exports = { Article };