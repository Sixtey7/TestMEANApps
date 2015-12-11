var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName : String,
  lastName : String,
  email : String,
  username : {
    type: String,
    trim: true
  },
  password : String,
  created: {
    type: Date,
    default: Date.now
  },
  website : {
    type: String,
    set: function(url) {
      if (!url) {
        return url;
      }
      else {
        if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
          url = 'http://' + url;
        }

        return url;
      }
    }
  }
});

//define our own custom static method
UserSchema.statics.findOneByUsername = function (username, callback) {
  this.findOne({ username: new RegExp(username, 'i') }, callback);
};

//define a virtual property
UserSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
});

UserSchema.set('toJSON', {virtuals: true});

mongoose.model('User', UserSchema);
