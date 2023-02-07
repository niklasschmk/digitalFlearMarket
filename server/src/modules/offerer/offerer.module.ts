import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Offerer} from "../../models/offerer";
import {OffererService} from "../../providers/offerer.service/offerer.service";
import {OffererController} from "../../controllers/offerer/offerer.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Offerer])],
    providers: [OffererService],
    controllers: [OffererController],
    exports: [TypeOrmModule]
})
export class OffererModule {}
