import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';
import * as express from 'express';
import { TransformInterceptor } from './interceptor/routerInterceptor';
import { logger } from './middleware/LoggerMiddleware';

async function bootstrap() {
  // 先加载配置
  require('dotenv').config({
    path: `.env.${process.env.NODE_ENV || 'dev'}`,
  });
  // 打印配置信息
  console.log('=== 应用启动配置 ===');
  console.log('HOST:', process.env.DATABASE_HOST);
  console.log('DATABASE_NAME:', process.env.DATABASE_NAME);
  console.log('==================');

  const app = await NestFactory.create(AppModule);

  // 使用中间件打印日志
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
  app.use(logger);

  // 使用拦截器打印响应
  app.useGlobalInterceptors(new TransformInterceptor());

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
