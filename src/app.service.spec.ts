import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HelperUtilityService } from '@utility';
import { Clg_Config } from '@model';

describe('AppService', () => {
	let service: AppService;
	let appJson: Clg_Config;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AppService, HelperUtilityService]
		}).compile();

		service = module.get<AppService>(AppService);
		appJson = await service.setEnvVars();
	});

	it('AppService should be defined', () => {
		expect(service).toBeDefined();
	});

	it('appJson should be defined', () => {
		console.log('___________appJson', appJson)
		expect(appJson.appId).toBeDefined();
	});

	// it('should return getRubiconJson()', () => {
	// 	const json = service.getRubiconJson();
	// 	expect(json.appId).toEqual(json.appId);
	// 	expect(json.environment).toEqual(json.environment);
	// });

	// it('should return init()', async () => {
	// 	const json = service.getRubiconJson();
	// 	const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule);
	// 	app.enableCors({ origin: true });
	// 	service.init(app, 10300).then((res: Rubicon_Configuration) => {
	// 		expect(res.appId).toEqual(json.appId);
	// 		expect(res.environment).toEqual(json.environment);
	// 	});
	// });
});
