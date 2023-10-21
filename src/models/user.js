const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userDocumentID: {
        type: String,
        required: true,
        unique: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    userImageURL: {
        type: String,
        required: true
    },
    entrySugarLevel: {
        type: Number,
        required: true
    }
});

const User = mongoose.model("User", userSchema,"Users");

module.exports = User;
