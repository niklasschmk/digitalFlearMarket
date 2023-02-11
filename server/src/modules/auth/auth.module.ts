import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Offerer} from "../../models/offerer";
import {Seller} from "../../models/seller";
import {AuthController} from "../../controllers/auth/auth.controller";
import {SellerService} from "../../providers/seller.service/seller.service";
import {OffererService} from "../../providers/offerer.service/offerer.service";

@Module({
  imports: [TypeOrmModule.forFeature([Offerer, Seller])],
  providers: [AuthService, SellerService, OffererService],
  controllers: [AuthController],
  exports: [TypeOrmModule]
})
export class AuthModule {}
