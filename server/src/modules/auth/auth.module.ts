import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {SellerService} from "../../providers/seller.service/seller.service";
import {OffererService} from "../../providers/offerer.service/offerer.service";

@Module({
  providers: [AuthService, SellerService, OffererService]
})
export class AuthModule {}
