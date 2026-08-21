import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';
import * as express from 'express';
import { RouterInterceptor } from './interceptor/RouterInterceptor';
import { logger } from './middleware/LoggerMiddleware';

async function bootstrap() {

    require('dotenv').config({
        path: `.env.${process.env.NODE_ENV || 'dev'}`,
    });

    console.log('=== 应用启动配置 ===');
    console.log('HOST:', process.env.DATABASE_HOST);
    console.log('DATABASE_NAME:', process.env.DATABASE_NAME);
    console.log('==================');

    const app = await NestFactory.create(AppModule);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(logger);

    app.useGlobalInterceptors(new RouterInterceptor());

    app.use(cors({
        origin: [
            'http://localhost:5173',
            'http://localhost:5176',
            'http://localhost:5175',
            'http://localhost:5174',
            'http://localhost:3001',
            'http://localhost:3006',
            'http://localhost:3007',
            'https://www.zrbjr.com',
            'https://zrbjr.com',
        ],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    }));
    await app.listen(process.env.PORT ?? 3012);
}

bootstrap();
