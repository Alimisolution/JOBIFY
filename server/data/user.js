import bcrypt from "bcryptjs";

const user = [
  {
    firstName: "Alimi",
    lastName: "Rosheed",
    email: "alimi@gmail.com",
    isAdmin: true,
    password: bcrypt.hashSync("1234", 10),
  },
  {
    firstName: "John",
    lastName: "Doe",
    email: "john@gmail.com",
    password: bcrypt.hashSync("1234", 10),
  },
];

export default user;
