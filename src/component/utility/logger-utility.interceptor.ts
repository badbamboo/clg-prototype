import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { LoggerUtilityService } from '@component/utility/logger-utility/logger-utility.service';
@Injectable()
export class LoggerUtilityInterceptor implements NestInterceptor {
	constructor(private logSrv: LoggerUtilityService) {}
	// onApplicationBootstrap() {}
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const { headers, method, body, originalUrl } = context.getArgs()[0];
		const startTime: number = Date.now();
		return next.handle().pipe(
			tap((appResponse: any) => {
				const endTime: number = Date.now();
				const duration = `${Date.now() - startTime}ms`;
				const option: any = { headers, method, body, originalUrl, startTime, endTime, duration };
				this.logSrv.logInterceptor(option);
				return appResponse;
			})
		);
	}
}
