import { Schema, model } from "mongoose";
import bycript from "bcryptjs";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        ref: "Role",
        //Relación con el modelo Role
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//Metodo para encriptar password
userSchema.statics.encryptPassword = async (password) => {
  const salt = await bycript.genSalt(10);
  return await bycript.hash(password, salt);
};

//Metodo de comparación para el password
userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bycript.compare(password, receivedPassword);
};

export default model('User', userSchema);
