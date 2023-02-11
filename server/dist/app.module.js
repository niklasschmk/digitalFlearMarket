"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_1 = require("./models/user");
const seller_1 = require("./models/seller");
const product_1 = require("./models/product");
const offerer_module_1 = require("./modules/offerer/offerer.module");
const products_module_1 = require("./modules/products/products.module");
const sellers_module_1 = require("./modules/sellers/sellers.module");
const users_module_1 = require("./modules/users/users.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const favorite_product_module_1 = require("./modules/favorite-product/favorite-product.module");
const favorite_seller_module_1 = require("./modules/favorite-seller/favorite-seller.module");
const auth_module_1 = require("./modules/auth/auth.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: './db/digitalFlearMarket.sqlite',
                entities: [user_1.User, seller_1.Seller, product_1.Product],
                synchronize: true,
                autoLoadEntities: true,
            }),
            offerer_module_1.OffererModule,
            products_module_1.ProductsModule,
            sellers_module_1.SellersModule,
            users_module_1.UsersModule,
            favorite_product_module_1.FavoriteProductModule,
            favorite_seller_module_1.FavoriteSellerModule,
            auth_module_1.AuthModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', '../client/DigitalFlearMarketClient/dist/'),
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map