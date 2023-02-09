import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import session from "express-session";
import {Server} from "socket.io";

class InMemorySessionStore{
  sessions: Map<any, any>;
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

class MessageStore{
  messages: any[];
  constructor() {
    this.messages = [];
  }

  saveMessage(message) {
    this.messages.push(message);
  }

  findMessagesForUser(userID) {
    return this.messages.filter(
        ({ from, to }) => from === userID || to === userID
    );
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
      new ValidationPipe({ transform: true, enableDebugMessages: true }),
  );
  const options = new DocumentBuilder()
      .setTitle('Digital Flear Market')
      .setDescription('Beschreibung')
      .setVersion("1.0")
      .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  let server = await app.listen(8080, function (){
    console.log('listening for requests on port 8080');
  });

  app.use(
      session({
        secret: 'dfm-secret',
        resave: false,
        saveUninitialized: false,
      }),
  );
  let sessionStore = new InMemorySessionStore();
  let messageStore = new MessageStore();

  let io = new Server(server);
  io.use((socket, next) => {
    const sessionId = socket.handshake.auth.sessionId;
    if (sessionId) {
      const session = sessionStore.findSession(sessionId);
      if (session) {
        socket.sessionId = sessionId;
        socket.userId = session.userId;
        socket.firstname = session.firstname;
        socket.lastname = session.lastname;
        return next
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
    const messagesPerUser = new Map();
    messageStore.findMessagesForUser(socket.userId).forEach((message) => {
      const {from, to} = message;
      const otherUser = socket.userId === from ? to : from;
      if (messagesPerUser.has(otherUser)) {
        messagesPerUser.get(otherUser).push(message);
      } else {
        messagesPerUser.set(otherUser, [message]);
      }
    });
    sessionStore.findAllSessions().forEach((session) => {
      users.push({
        userId: session.userId,
        firstname: session.firstname,
        lastname: session.lastname,
        connected: session.connected,
        messages: messagesPerUser.get(session.userId) || [],
      });
    });
    socket.emit("users", users);

    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        userId: id,
        firstname: socket.firstname,
        lastname: socket.lastname,
      })
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

    socket.on("send private message", ({content, to}) => {
      const message = {
        content,
        from: socket.userId,
        to,
      };
      socket.to(to).to(socket.userId).emit("private message", message);
      messageStore.saveMessage(message);
    });

    socket.on("get private message", ({content, from}) => {
      for (let i = 0; i < this.users.length; i++){
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

    socket.on("disconnect", async () =>{
      console.log('Socket is disconnected');
      const matchingSockets = await io.in(socket.userId).allSockets();
      const isDisconnected = matchingSockets.size === 0;
      if (isDisconnected){
        socket.broadcast.emit("user disconnected", socket.userId);
        sessionStore.saveSession(socket.sessionId, {
          userId: socket.userId,
          firstname: socket.firstname,
          lastname: socket.lastname,
          connected: false,
        });
      }
    });

    socket.on('chat', function (data){
      io.sockets.emit('chat', data);
    });
    socket.on('typing', function (data){
      socket.broadcast.emit('typing', data);
    });
    socket.on('erase', function(data){
      socket.broadcast.emit('erase', data);
    });
  });
  console.log('');
  console.log('-------------------------------------------------------------');
  console.log('                    ToDo-Backend läuft                       ');
  console.log('-------------------------------------------------------------');
  console.log('       Liste abrufen:     http://localhost:8080/     ');
  console.log('       Frontend aufrufen: http://localhost:4200              ');
  console.log('-------------------------------------------------------------');
}
bootstrap();
