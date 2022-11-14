import { Controller, Get, Req, UseInterceptors } from '@nestjs/common';
import { CONTRACT_CONF } from '@configuration';
import { HelperUtilityService } from '@component/utility/helper-utility/helper-utility.service';
import { LoggerUtilityInterceptor } from '@component/utility/logger-utility.interceptor';
import { Clg_Config } from '@model';

@Controller()
export class AppController extends HelperUtilityService {
	@Get(CONTRACT_CONF.config.path)
	@UseInterceptors(LoggerUtilityInterceptor)
	async handleAppJsonConfig(): Promise<Clg_Config> {
		return this.getAppJson();
	}
}
