const express = require("express");
const app = express();
const port = 8081;
const Chat = require("./models/chat");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
main()
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.get("/", (req, res) => {
  res.send("It's Working!");
});

//Index Route
app.get("/chats", async (req, res) => {
  let chats = await Chat.find({});
  res.render("index.ejs", { chats });
});

//New Route
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

//Create Route
app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
    updatedAt: new Date(),
  });
  newChat
    .save()
    .then((res) => console.log("Chat is saved"))
    .catch((err) => console.log("error"));
  res.redirect("/chats");
});
//Edit Route
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});
// Update Route
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg,
      updatedAt : new Date()
    },
    { runValidators: true, new: true }
  );
  console.log(updatedChat);
  res.redirect("/chats");
});
//Destroy Route
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let chatToBeDeleted = await Chat.findByIdAndDelete(id);
  console.log(chatToBeDeleted);
  res.redirect("/chats");
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
