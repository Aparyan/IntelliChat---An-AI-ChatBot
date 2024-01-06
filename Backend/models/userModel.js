const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    chats: {
        type: [ {
            chat: {
                type: String
            },
            role: {
                type: String
            }
        } ]
    }
},
{timestamps: true}
);

module.exports = new mongoose.model("User", userSchema);