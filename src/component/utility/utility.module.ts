import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpUtilityService } from '@component/utility/http-utility/http-utility.service';
import { HelperUtilityService } from '@component/utility/helper-utility/helper-utility.service';
import { LoggerUtilityController } from '@component/utility/logger-utility/logger-utility.controller';
import { LoggerUtilityService } from '@component/utility/logger-utility/logger-utility.service';
@Module({
	imports: [
		HttpModule.register({
			timeout: 25000,
			maxRedirects: 5
		})
	],
	controllers: [LoggerUtilityController],
	providers: [HelperUtilityService, HttpUtilityService, LoggerUtilityService],
	exports: [HttpUtilityService, HelperUtilityService, LoggerUtilityService]
})
export class UtilityServiceModule {}
