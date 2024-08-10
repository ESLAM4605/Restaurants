import mongoose from "mongoose";
const connectToMongoDb = () => {
  mongoose
    .connect(process.env.DB_STRING as string)
    .then(() => console.log("Connected to DB successfully..."))
    .catch((error: Error) => console.error("Error connecting to DB:", error));
};

export default connectToMongoDb;
