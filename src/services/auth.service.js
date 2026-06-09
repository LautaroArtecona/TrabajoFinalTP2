import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const registerUserInDB = async ({ name, email, password, rol }) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("Ya existe un usuario con ese email.");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ name, email, password: hashedPassword, rol });
  return await newUser.save();
};

export const loginUserInDB = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Credenciales inválidas.");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Credenciales inválidas.");
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, rol: user.rol },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      rol: user.rol,
    },
  };
};
