import { Controller, Post, Req, UseInterceptors } from '@nestjs/common';
import { LoggerUtilityInterceptor } from '@component/utility/logger-utility.interceptor';
import { CONTRACT_CONF } from '@configuration';
import { LoggerUtilityService } from './logger-utility.service';
@Controller()
export class LoggerUtilityController {
	constructor(private logSrv: LoggerUtilityService) {}

	@Post(CONTRACT_CONF.log.path)
	@UseInterceptors(LoggerUtilityInterceptor)
	async handleLog(@Req() req): Promise<any> {
		const { headers, method, body, originalUrl } = req;
		return this.logSrv.logRequest({ headers, method, body, originalUrl });
	}
}
