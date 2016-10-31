const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = mongoose.Schema({
username: {type:String, required: true, unique: true},
address:     { type: String, required: true},
passwordHash: {type:String, required: true},
groupName: String,
selectedFireworkDisplayId: String
});


function setPassword(value){
  this._password  = value;
  this.passwordHash = bcrypt.hashSync(value, bcrypt.genSaltSync(8));
}

function setPasswordConfirmation(passwordConfirmation) {
  this._passwordConfirmation = passwordConfirmation;
}

function validatePasswordHash() {
  if (this.isNew) {
    if(!this._password) {
      return this.invalidate("password", "Password Required");
    }

    if (this._password.length < 6) {
      this.invalidate("password", "Password must be 6 characters");
    }

    if (this._password !== this._passwordConfirmation) {
      return this.invalidate("passwordConfirmation", "Passwords do not match");
    }
  }
}


function validatePassword(password) {
  return bcrypt.compareSync(password, this.passwordHash);
}


userSchema
  .virtual('password')
  .set(setPassword);

userSchema
  .virtual('passwordConfirmation')
  .set(setPasswordConfirmation);

  userSchema
  .path('passwordHash')
  .validate(validatePasswordHash);


userSchema.methods.validatePassword = validatePassword;

userSchema.set("toJSON", {
  transform: function(doc, ret) {
    delete ret.passwordHash;
    delete ret.__v;
    return ret;
  }
});



module.exports = mongoose.model('User', userSchema);
