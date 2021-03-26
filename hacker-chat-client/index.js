#!/usr/bin/env node

/*
chmod +x index.js

para instalar -> npm i -g @pablovicz/hacker-chat-client
para tirar -> npm unlink -g @pablovicz/hacker-chat-client

bash  node index.js

hacker-chat \
    --username pablovicz\
    --room sala01


./index.js \
    --username pablovicz\
    --room sala01
*/ 


import Events from 'events'
import CliConfig from './src/cliConfig.js';
import SocketClient from './src/socket.js';
import TerminalController from "./src/terminalController.js";
import EventManager from "./src/eventManager.js";

const [nodePath, filePath, ...commands] = process.argv
const config = CliConfig.parseArguments(commands)

const componentEmitter = new Events()
const socketClient = new SocketClient(config)
await socketClient.initialize()
const eventManager = new EventManager({ componentEmitter, socketClient })
const events = eventManager.getEvents()
socketClient.attachEvents(events)
const data = {
    roomId: config.room,
    userName: config.username
}
eventManager.joinRoomAndWaitForMessages(data)
const controller = new TerminalController()
await controller.initializeTable(componentEmitter)



