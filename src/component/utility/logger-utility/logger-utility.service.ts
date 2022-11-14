import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerUtilityService {
	protected logConfig(): any {
		const { ENVIRONMENT, APP_JSON_FILE } = process.env;
		const json: any = JSON.parse(APP_JSON_FILE);
		return { ...json, ENVIRONMENT };
	}

	logHttpMessage(option: any): any {
		const { code, message, level } = option;
		const { environment, ENVIRONMENT, appId, appVersion } = this.logConfig();
		const response: any = <any>{
			appId,
			appVersion,
			environment: environment || ENVIRONMENT,
			level,
			message,
			statusCode: code
		};
		console.log(JSON.stringify(response));
		return option;
	}

	logInit(functionName: string): any {
		const stack: string = new Error().stack || ``;
		const stackList: string[] = stack.split(`\n`).filter((i: string) => i.match(`service.ts`));
		stackList.shift();
		const className: string = stackList
			.join()
			.split(`/`)
			.filter((i: string) => i.match(`service.ts`))
			.join()
			.split(`:`)
			.shift();
		const { environment, ENVIRONMENT, appId, appVersion } = this.logConfig();
		const response: any = <any>{
			appId,
			appVersion,
			environment: environment || ENVIRONMENT,
			trackingId: new Date().getTime(),
			class: className,
			function: functionName
		};
		console.log(JSON.stringify(response));
		return response;
	}

	logInterceptor(request: any, status = 200): any {
		const { headers, method, body, originalUrl, startTime, endTime, duration } = request;
		const { environment, ENVIRONMENT, appId, appVersion } = this.logConfig();
		body.class = LoggerUtilityService.name;
		body.function = this.logInterceptor.name;
		body.statusCode = status;
		const response: any = <any>{
			...body,
			appId,
			appVersion,
			httpVerb: method,
			endpoint: originalUrl,
			environment: environment || ENVIRONMENT,
			message: `${JSON.stringify(body.message)} - ${JSON.stringify(headers)} - ${JSON.stringify({ startTime, endTime, duration })}`,
			level: `info`
		};
		console.log(JSON.stringify(response));
		return response;
	}

	logRequest(request: any, status = 200): any {
		const { body } = request;
		const { environment, ENVIRONMENT } = this.logConfig();
		const response: any = <any>{
			...body,
			environment: environment || ENVIRONMENT
		};
		console.log(JSON.stringify(response));
		return {
			request,
			response,
			status,
			hasError: status !== 200 ? true : false
		};
	}
}
