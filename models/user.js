var mongoose = requrie('mongoose');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  email   : String,
  posts   : [{
    type: Schema.Types.ObjectId,
    ref : 'post'
  }]
});

module.exports = mongoose.model('User', UserSchema);