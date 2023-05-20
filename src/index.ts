import app from "./app";
import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI, { dbName: "HL" })
  .then(() => console.log("Connected to database"))
  .then(() => {
    const port = process.env.PORT || 8080;
      app.listen(port, () => {
      console.log("Listening on port 🚀 ", port);
    });
  })
  .catch((err) => console.error(err));
