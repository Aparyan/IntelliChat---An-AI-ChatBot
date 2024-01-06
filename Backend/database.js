const mongoose = require('mongoose');
require('dotenv').config();

const connect = mongoose.connect(process.env.MONGO_URL);
connect.then(() => {
    console.log("DB connected");
}).catch((err) => {
    console.log("DB error");})

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
});

module.exports = new mongoose.model("User", userSchema);