let mongoose = require('mongoose');
let bcrypt = require('bcrypt');

let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },
      name: {
        type: String,
        required: true,
        trim: true,
      },
      favoriteBook: {
        type: String,
        required: true,
        trim: true
      },
      password: {
        type: String,
        required: true
      }
});

// authenticate user information agains database
UserSchema.statics.authenticate = function(email, password, callback){
  User.findOne({ email: email})
    .exec(function(error, user){
      if (error) {
        return callback(error);
      } else if (!user){
        let err = new Error('User not found!');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function(error, result){
        if (result === true){
          return callback(null, user)
        } else {
          return callback();
        }
      })
    })
}

// hash password before saving to db
UserSchema.pre('save', function(next) {
    let user = this;
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

let User = mongoose.model('User', UserSchema);
module.exports = User;