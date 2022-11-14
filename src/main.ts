import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function bootstrap() {
	const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule);
	app.enableCors({ origin: true });
	const nestAppService: any = new AppService();
	nestAppService.init(app);
}

bootstrap();
