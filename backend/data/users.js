import bcrypt from "bcryptjs";

export const users = [
  {
    id: 1,
    email: "test@example.com",
    password: bcrypt.hashSync("123456", 10)
  }
];
