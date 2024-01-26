import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/user.js";
import User from "./Models/userModel.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("App successfully connected to the database"))
  .catch((err) => console.log("Error", err));

const importData = async () => {
  try {
    await User.deleteMany();

    await User.insertMany(users);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
