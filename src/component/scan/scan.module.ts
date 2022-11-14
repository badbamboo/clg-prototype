import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MulterModule } from '@nestjs/platform-express';
import { ScanController } from '@component/scan/scan.controller';
import { ScanService } from '@component/scan/scan.service';
import { APP_CONF } from '@configuration';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
	imports: [
		HttpModule.register({
			timeout: 25000,
			maxRedirects: 5
		}),
		MulterModule.register({
			dest: APP_CONF.FLD_IMAGE_SCAN
		}),
		ServeStaticModule.forRoot({
			rootPath: join(process.cwd(), '..', APP_CONF.STATIC_FOLDER)
		}),
		ScanModule
	],
	controllers: [ScanController],
	providers: [ScanService]
})
export class ScanModule {}
// localhost:10200/a/image_scan/48f15ddd72ac0bb6e3a86f6fb9e621bb
