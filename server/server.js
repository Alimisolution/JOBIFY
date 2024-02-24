import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import expressFileUpload from "express-fileupload";
import jobRoutes from "./Routes/jobRoute.js";
import userRoutes from "./Routes/userRoute.js";
import { errorHandler, notFound } from "./MiddleWare/errorHandler.js";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("App successfully connected to the database"))
  .catch((err) => console.log("Error", err));

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.options("*", cors());
app.use(expressFileUpload());
app.use(express.static("uploads"));

app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(dirname(__dirname), "client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(dirname(__dirname), "client", "dist", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api is running");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`App run on port ${PORT}`));
