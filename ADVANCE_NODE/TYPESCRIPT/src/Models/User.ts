import * as mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (val: string) {
        return /^\S+@\S+\.\S+$/.test(val);
      },
      message: (props: { value: string }) =>
        `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
});

export const User = mongoose.model("User", UserSchema);

module.exports = User;
