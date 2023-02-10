"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const express_session_1 = require("express-session");
class InMemorySessionStore {
    constructor(sessionService) {
        this.sessionService = sessionService;
        this.sessions = new Map();
    }
    findSession(id) {
        return this.sessionService.findSession(id);
    }
    saveSession(id, session) {
        this.sessionService.saveSession(id, session);
    }
    findAllSessions() {
        return this.sessionService.findAllSessions();
    }
}
class MessageStore {
    constructor(messageService) {
        this.messageService = messageService;
        this.messages = [];
    }
    saveMessage(message) {
        this.messageService.saveMessage(message.content, message.from, message.to);
    }
    findMessagesForUser(userID) {
        return this.messageService.findMessagesForUser(userID);
    }
}
function randomId() {
    return Math.floor(Math.random() * (1000 - 1 + 1));
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
    console.log('');
    console.log('-------------------------------------------------------------');
    console.log('                    ToDo-Backend läuft                       ');
    console.log('-------------------------------------------------------------');
    console.log('       Liste abrufen:     http://localhost:8080/     ');
    console.log('-------------------------------------------------------------');
}
bootstrap();
//# sourceMappingURL=main.js.map
