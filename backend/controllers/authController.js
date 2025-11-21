import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { users } from "../data/users.js";

export const login = (req, res) => {

  console.log(req.body);
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user)
    return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch)
    return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    "SECRET123",
    { expiresIn: "24h" }
  );

  res.json({ token });
};
