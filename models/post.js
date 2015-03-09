var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var PostSchema = new Schema({
  title    : String,
  body     : String,
  author_id: {
    type: Schema.Types.ObjectId,
    ref : 'User'
  }
});

module.exports = mongoose.model('Post', PostSchema);