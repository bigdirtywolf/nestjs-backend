import {Module} from '@nestjs/common';
import * as controller from './controller'
import * as service from './service'
import * as entity from './entity'
import {TypeOrmModule} from "@nestjs/typeorm";
import {HttpModule} from "@nestjs/axios";
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
                envFilePath: `.env.${process.env.NODE_ENV || 'dev'}`,
                isGlobal: true,
            },
        ),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DATABASE_HOST,
            port: 3306,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE,
            synchronize: false,
            entities: Object.values(entity),
        }),
        TypeOrmModule.forFeature(Object.values(entity)),
        HttpModule
    ],
    controllers: Object.values(controller),
    providers: Object.values(service),
})

export class AppModule {}
