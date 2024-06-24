"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const db_1 = __importDefault(require("./Config/db"));
const chat_1 = __importDefault(require("./Model/chat"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("join_room", (data) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(data);
        socket.join(data.roomId);
        const chats = yield chat_1.default.find({
            roomId: data.roomId
        });
        io.to(data.roomId).emit("old_chats", {
            data: chats
        });
    }));
    socket.on("message_send", (data) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield chat_1.default.create({
            name: data.name,
            message: data.message,
            roomId: data.roomId
        });
        io.to(data.roomId).emit("message_received", data);
    }));
});
server.listen(3003, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('server is listening on the PORT 3003');
    yield (0, db_1.default)();
    console.log("connected to the db");
}));
