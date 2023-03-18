const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const playerSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    club: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    goals: {
        type: Number,
        required: true
    },
    isCaptain: {
        type: Boolean,
        default: false
    },
    nations: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "nations",
        require: true,
    },
}, {
    timestamps: true
});
var Players = mongoose.model("players", playerSchema);
module.exports = Players;