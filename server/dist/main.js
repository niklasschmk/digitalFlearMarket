"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const express_session_1 = require("express-session");
const socket_io_1 = require("socket.io");
class InMemorySessionStore {
    constructor() {
        this.sessions = new Map();
    }
    findSession(id) {
        return this.sessions.get(id);
    }
    saveSession(id, session) {
        this.sessions.set(id, session);
    }
    findAllSessions() {
        return [...this.sessions.values()];
    }
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true, enableDebugMessages: true }));
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Digital Flear Market')
        .setDescription('Beschreibung')
        .setVersion("1.0")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
    let server = await app.listen(8080, function () {
        console.log('listening for requests on port 8080');
    });
    app.use((0, express_session_1.default)({
        secret: 'dfm-secret',
        resave: false,
        saveUninitialized: false,
    }));
    let sessionStore = new InMemorySessionStore();
    let io = new socket_io_1.Server(server);
    io.use((socket, next) => {
        const sessionId = socket.handshake.auth.sessionId;
        if (sessionId) {
            const session = sessionStore.findSession(sessionId);
            if (session) {
                socket.sessionId = sessionId;
                socket.userId = session.userId;
                socket.firstname = session.firstname;
                socket.lastname = session.lastname;
                return next;
            }
        }
        const firstname = socket.handshake.auth.firstname;
        const lastname = socket.handshake.auth.lastname;
        if (!firstname && !lastname) {
            return next(new Error('invalid name'));
        }
        socket.sessionId = randomId();
        socket.userId = randomId();
        socket.firstname = firstname;
        socket.lastname = lastname;
        next();
    });
    io.on('connection', socket => {
        console.log('made socket connection with: ', socket.id);
        const users = [];
        for (let [id, socket] of io.of("/").sockets) {
            users.push({
                userId: id,
                firstname: socket.firstname,
                lastname: socket.lastname,
            });
        }
        socket.join(socket.userId);
        socket.emit("session", {
            sessionId: socket.sessionId,
            userId: socket.userId,
        });
        socket.broadcast.emit("user connected", {
            userId: socket.id,
            firstname: socket.firstname,
            lastname: socket.lastname,
        });
        socket.on("user connected", (user) => {
            initReactiveProperties(user);
            this.users.push(user);
        });
        socket.on("send private message", ({ content, to }) => {
            socket.to(to).to(socket.userId).emit("private message", {
                content,
                from: socket.userId,
                to
            });
        });
        socket.on("get private message", ({ content, from }) => {
            for (let i = 0; i < this.users.length; i++) {
                const user = this.users[i];
                if (user.userId === from) {
                    user.messages.push({
                        content,
                        fromSelf: false,
                    });
                    if (user !== this.selectedUser) {
                        user.hasNewMessages = true;
                    }
                    break;
                }
            }
        });
        socket.on("disconnect", async () => {
            console.log('Socket is disconnected');
            const matchingSockets = await io.in(socket.userId).allSockets();
            const isDisconnected = matchingSockets.size === 0;
            if (isDisconnected) {
                socket.broadcast.emit("user disconnected", socket.userId);
                sessionStore.saveSession(socket.sessionId, {
                    userId: socket.userId,
                    firstname: socket.firstname,
                    lastname: socket.lastname,
                    connected: false,
                });
            }
        });
        socket.on('chat', function (data) {
            io.sockets.emit('chat', data);
        });
        socket.on('typing', function (data) {
            socket.broadcast.emit('typing', data);
        });
        socket.on('erase', function (data) {
            socket.broadcast.emit('erase', data);
        });
    });
    console.log('');
    console.log('-------------------------------------------------------------');
    console.log('                    ToDo-Backend läuft                       ');
    console.log('-------------------------------------------------------------');
    console.log('       Liste abrufen:     http://localhost:8080/todolist     ');
    console.log('       Frontend aufrufen: http://localhost:4200              ');
    console.log('-------------------------------------------------------------');
}
bootstrap();
//# sourceMappingURL=main.js.map
