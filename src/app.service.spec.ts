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
		expect(appJson.appId).toBeDefined();
	});
});
