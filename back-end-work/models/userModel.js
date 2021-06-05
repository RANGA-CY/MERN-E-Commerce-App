import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: String,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// bcrypt.genSalt(10, function (err, salt) {
//     bcrypt.hash(this.password, salt, function (err, hash) {
//       this.password = hash;
//     });
//   });
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     next();
//   }
//   // const salt = bcrypt.genSalt(10); (here missing await causes many problems)
//   // this.password = await bcrypt.hash(this.password, salt);
// });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
