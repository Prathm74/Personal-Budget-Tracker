import bcrypt from "bcryptjs";

export default [
  {
    id: 1,
    name: "Test User",
    email: "test@example.com",
    password: bcrypt.hashSync("123456", 10)
  }
];
