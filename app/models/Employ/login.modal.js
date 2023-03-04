const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { v4: uuidv4 } = require('uuid');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);

// UserSchema.pre('save', async function (next) {
//   const user = this;

//   if (user.isModified('password')) {
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(user.password, salt);
//     user.password = hash;
//   }

//   next();
// });

// UserSchema.methods.comparePassword = async function (password) {
//   const user = this;
//   return await bcrypt.compare(password, user.password);
// };

// UserSchema.methods.generateAuthToken = function () {
//   const user = this;
//   const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
//     expiresIn: '7d',
//   });
//   return token;
// };

module.exports = mongoose.model('User', UserSchema);
