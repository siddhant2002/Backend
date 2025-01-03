const mongoose = require("mongoose");

const url = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visitHistory: [
        {
            timestamps: { type: Number },
        }
    ],
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "users",
    },
},
{ timestamps: true});

const urlShort = mongoose.model("url", url);

module.exports = urlShort;