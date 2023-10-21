const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(
        "mongodb+srv://chenv1240:lO2YvY1nDZdEKhQ7@caproject.6wjd125.mongodb.net/CAproject",
        {}
    )
    .then(() => console.log("Connected to DB"))
    .catch((error) => console.error("Connection error:", error));
};

module.exports = connectDB;
