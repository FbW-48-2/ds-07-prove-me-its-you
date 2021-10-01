import mongoose from "mongoose"
const { Schema, model } = mongoose

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
},
{
  toJSON: {
    transform: (original, returnedDoc) => {
      delete returnedDoc.password;
    }
  }
})

const User = model("User", UserSchema);

export default User;
