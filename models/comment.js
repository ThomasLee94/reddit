const mongoose = require('mongoose');
const Populate = require('../util/autopopulate');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

CommentSchema
  .pre('findOne', Populate('author'))
  .pre('find', Populate('author'))
  .pre('findOne', Populate('comment'))
  .pre('find', Populate('comment'))

module.exports = mongoose.model('Comment', CommentSchema);