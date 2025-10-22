const mongoose = require('mongoose');
const Chat = require("./models/chat")


main()
.then(()=>console.log("Connection Successful"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}


let allChats = [
  {
    from: "Keshav",
    to: "Vini",
    msg: "Hey Vini! How’s your day going?",
    created_at: new Date()
  },
  {
    from: "Vini",
    to: "Keshav",
    msg: "Heyy! It’s been good 😄 Just a bit busy with work.",
    created_at: new Date()
  },
  {
    from: "Keshav",
    to: "Vini",
    msg: "Haha same here! Missing our evening walks though 😅",
    created_at: new Date()
  },
  {
    from: "Vini",
    to: "Keshav",
    msg: "Aww, we’ll go this weekend for sure 🌸",
    created_at: new Date()
  },
  {
    from: "Keshav",
    to: "Vini",
    msg: "Deal 😎 I’ll bring coffee this time!",
    created_at: new Date()
  }
];


Chat.insertMany(allChats)
.then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log("❌ Error inserting chats:", err);
  });