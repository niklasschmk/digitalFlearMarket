"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
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
    await app.listen(8080);
    console.log('');
    console.log('-------------------------------------------------------------');
    console.log('                    ToDo-Backend läuft                       ');
    console.log('-------------------------------------------------------------');
    console.log('       Liste abrufen:     http://localhost:8080/             ');
    console.log('-------------------------------------------------------------');
}
bootstrap();
//# sourceMappingURL=main.js.map