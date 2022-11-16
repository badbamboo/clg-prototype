import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import * as bodyParser from 'body-parser';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function bootstrap() {
	const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule);
	app.use(bodyParser.json({ limit: '150mb' }));
	app.use(bodyParser.raw({ limit: '150mb' }));
	app.use(bodyParser.text({ limit: '150mb' }));
	app.use(bodyParser.urlencoded({ limit: '150mb', extended: true }));
	app.enableCors({ origin: true });
	const nestAppService: any = new AppService();
	nestAppService.init(app);
}

bootstrap();
