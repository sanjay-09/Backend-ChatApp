"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const chatSchema = mongoose.Schema({
    name: {
        type: String
    },
    roomId: {
        type: String
    },
    message: {
        type: String
    },
});
const chat = mongoose.model('chats', chatSchema);
exports.default = chat;
