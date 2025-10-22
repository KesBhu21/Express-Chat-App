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
    from: "Alice",
    to: "Bob",
    msg: "Hey Bob! How’s your day going?",
    created_at: new Date()
},
{
    from: "Bob",
    to: "Alice",
    msg: "Heyy! It’s been good 😄 Just a bit busy with work.",
    created_at: new Date()
},
{
    from: "Alice",
    to: "Bob",
    msg: "Haha same here! Missing our evening walks though 😅"

];


Chat.insertMany(allChats)
.then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log("❌ Error inserting chats:", err);
  });
