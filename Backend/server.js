const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors');
const User = require('./models/userModel');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { generateFromEmail, generateUsername } = require("unique-username-generator");
const connectDB = require('./config/connectDB')

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'))

const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function main(msg) {
    const completion = await openai.chat.completions.create({
        messages: [ { "role": "system", "content": "You are an tech interviewer." },
        { "role": "user", "content": msg }
        ],
        model: "gpt-3.5-turbo",
    });

    return (completion.choices[ 0 ].message.content);
}


app.post('/login', async (req, res) => {
    const d = req.body.data;
    const USER = await User.find({ email: d.email });
    if (USER.length !== 0) {
        let isMatched = await bcrypt.compare(d.password, USER[ 0 ].password);
        if (isMatched) {
            console.log("Correct password");
            res.json({ username: USER[ 0 ].username });
        }
        else {
            console.log("Wrong password!");
            res.json({ username: null });
        }
        return;
    }
    else {
        const hashedPassword = await bcrypt.hash(d.password, 10);
        const userName = generateFromEmail(
            d.email,
            3
        );
        const user = new User({
            username: userName,
            email: d.email,
            password: hashedPassword,
            chats: []
        });
        await user.save().then(() => {
            console.log("New user");
        }).catch((e) => {
            console.log(e);
        });
        res.json({ username: userName });
    }
    return;
});

app.get('/userChats', async (req, res) => {
    console.log(req.get('username'));
    await User.find({ username: req.get('username') }).then(USER => {
        res.send(USER[ 0 ].chats);
    })
});

app.post('/setChat', async (req, res) => {
    const d = req.body.data;
    await User.find({ username: d.username }).then(async (USER) => {
        let newChat = [];
        console.log(USER);
        for (let i = 0; i < USER[ 0 ].chats.length; i++) {
            newChat.push(USER[ 0 ].chats[ i ]);
        }
        newChat.push({ 'chat': d.Chats, 'role': 'user' });
        await main(d.Chats).then(async (ai) => {
            newChat.push({ 'chat': ai, 'role': 'ai' });
            await User.findOneAndUpdate({ username: d.username }, {
                _id: USER[ 0 ]._id,
                username: USER[ 0 ].username,
                email: USER[ 0 ].email,
                password: USER[ 0 ].password,
                chats: newChat
            }).then(() => {
                res.send(ai);
            });
        })
    })
});

const PORT = 5000 || process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})