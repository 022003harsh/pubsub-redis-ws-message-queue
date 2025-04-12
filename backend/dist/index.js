"use strict";
//webSocket code(no express)
// import WebSocket, { WebSocketServer } from "ws";
// import http from "http"; // native http library in node.js and is bundled in node.js itself
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// //Create a http server
// const server = http.createServer(function (request: any, response: any) {
//   console.log(new Date() + " Received request for " + request.url);
//   response.end("hi there");
// });
// const wss = new WebSocketServer({ server });
// let userCount = 0;
// //Connect the websocketserver
// wss.on("connection", function connection(ws) {
//   //anytime if there is an error in websocket
//   //ws.on('error', console.error);
//   ws.on('error', (err) => console.error(err));
//   //if a message comes do this
//   ws.on("message", function message(data, isBinary) {
//     //broadcast the msg to everyone connected 
//     wss.clients.forEach(function each(client) {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(data, { binary: isBinary });
//       }
//     });
//   });
//   //this count will be seen in terminal as the user connect to the server we connect from postwoman
//   console.log("user connected",++userCount);
//   //as soon as user connects send this
//   ws.send("Hello! Message From Server!!");
// });
// server.listen(8080, function () {
//   console.log(new Date() + " Server is listening on port 8080");
// });
// express code
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("Hello World");
});
const httpServer = app.listen(8080);
let userCount = 0;
const wss = new ws_1.WebSocketServer({ server: httpServer });
wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    ws.on('message', function message(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
    console.log("user connected", ++userCount);
    ws.send('Hello! Message From Server!!');
});
