import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CONTRACT_CONF } from '@configuration';
import { FileInterceptor } from '@nestjs/platform-express';
import { ScanService } from '@component/scan/scan.service';

@Controller()
export class ScanController {
	constructor(private scanSrv: ScanService) {}

	@Post(CONTRACT_CONF.scan.path)
	@UseInterceptors(FileInterceptor('imageFile'))
	async handleScan(@UploadedFile() file): Promise<any> {
		const { path } = file;
		return this.scanSrv.ocrRead(path);
	}
}
