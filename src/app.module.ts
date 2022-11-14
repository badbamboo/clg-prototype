import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from '@server/app.controller';
import { AppService } from '@server/app.service';
import { UtilityServiceModule } from '@component/utility/utility.module';
import { ScanModule } from '@component/scan/scan.module';

@Module({
	imports: [
		HttpModule.register({
			timeout: 25000,
			maxRedirects: 5
		}),
		ScanModule,
		UtilityServiceModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
