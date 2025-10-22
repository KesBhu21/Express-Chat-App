const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema({
    from:{
        type:String
    },
    to:{
        type:String
    },
    msg:{
        type:String,
        maxlength:100
    },
    created_at:{

        type:Date,
        required:true,
    },
    updated_at:{
        type:String,
        required:true
    }
})

const Chat = mongoose.model("Chat",chatSchema)

module.exports = Chat