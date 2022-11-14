import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { HTTP_CONF } from '@configuration';
import { LoggerUtilityService } from '@component/utility/logger-utility/logger-utility.service';
import _ = require('lodash');

@Injectable()
export class HttpUtilityService extends LoggerUtilityService {
	private httpConfig = <any>HTTP_CONF;

	httpMessage(code: number, data: any = {}, hasError = true): any {
		const statusObj: any = this.httpConfig[`code${code.toString()}`];
		const stack: string = new Error().stack;
		const val: string = typeof data === `string` ? data : JSON.stringify(data);
		const compiled = _.template(statusObj.message);
		statusObj.message = compiled({ val, stack });
		return { ...statusObj, hasError };
	}

	accepted(val: any = ``, code?: number): any {
		const httpMsg: any = this.httpMessage(HttpStatus.ACCEPTED, val, false);
		httpMsg.code = code || typeof val === 'number' ? val : null || httpMsg.code;
		return httpMsg;
	}

	badRequest(val?: any): any {
		return this.httpMessage(HttpStatus.BAD_REQUEST, val);
	}

	internalServerError(val?: any): any {
		return this.httpMessage(HttpStatus.INTERNAL_SERVER_ERROR, val);
	}
}
