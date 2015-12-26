var mongoose = require('mongoose'),
crypto = require('crypto'),
Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName : String,
  lastName : String,
  email : {
    type : String,
    match : [/.+\@.+\..+/, "Please enter a valid email address"]
  },
  username : {
    type: String,
    unique : true,
    required: 'Username is required',
    trim: true
  },
  password : {
    type : String,
    validate : [
      function(password) {
        return password && password.length > 6;
      }, 'Password should be longer'
    ]
  },
  salt : {
    type : String
  },
  provider : {
    type : String,
    required : 'Provider is requred'
  },
  providerId : String,
  providerData : {},
  created: {
    type: Date,
    default: Date.now
  }
});


//define a virtual property
UserSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
  var spllitName = fullName.split(' ');
  this.firstName = splitName[0] || '';
  this.lastName = splitName[1] || '';
});

UserSchema.pre('save', function(next) {
  if (this.password) {
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password);
  }

  next();
});

UserSchema.methods.hashPassword = function(password) {
  return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

UserSchema.methods.authenticate = function(password) {
  return this.password === this.hashPassword(password);
}

//define our own custom static method
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
  var _this = this;
  var possibleUsername = username + (suffix || '');

  _this.findOne({
    username : possibleUsername
  }, function(err, user) {
    if (!err) {
      if (!user) {
        callback(possibleUsername);
      }
      else {
        return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
      }
    }
    else {
      callback(null);
    }
  });
};


UserSchema.set('toJSON', {
  virtuals: true,
  getters : true
});

mongoose.model('User', UserSchema);
