const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true
        },
        name: {
            type: String,
            require: true
        },
        YOB: {
            type: Number,
            require: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    }, 
    {
        timestamps: true
    }
);

const User = mongoose.model("user", userSchema);
module.exports = User;