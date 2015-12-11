var User = require('mongoose').model('User');

/*
* Create
*/
exports.create = function(req, res, next) {
  var user = new User(req.body);

  user.save(function(err) {
    if (err) {
      return next(err);
    }
    else {
      res.json(user);
    }
  });
};

/*
* Read
*/
exports.list = function(req, res, next) {
  User.find({}, function(err, users) {
    if (err) {
      return next(err);
    }
    else {
      res.json(users);
    }
  });
};


exports.read = function(req, res) {
  res.json(req.user);
};

/*
* Update
*/
exports.update = function(req, res, next) {
  User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
    if (err) {
      return next(err);
    }
    else {
      res.json(user);
    }
  });
};

/*
* Delete
*/
exports.delete = function(req, res, next) {
  req.user.remove(function(err) {
    if (err) {
      return next(err);
    }
    else {
      res.json(req.user);
    }
  });
};

/*
* Additional Middleware
*/
exports.userByID = function(req, res, next, id) {
  User.findOne({
    _id : id
  }, function(err, user) {
    if (err) {
      return next(err);
    }
    else {
      req.user = user;
      next();
    }
  });
};

exports.userByUsername = function(req, res, next, userName) {
  User.findOneByUsername({
    username : userName
  }, function(err, user) {
    if (err) {
      return next(err);
    }
    else {
      req.user = user;
      next();
    }
  });
};
