import { Injectable } from '@nestjs/common';
import Tesseract from 'tesseract.js';
import { HelperUtilityService } from '@utility';
import { SCAN_CONF } from '@configuration';
@Injectable()
export class ScanService extends HelperUtilityService {
	scanConfig = <any>SCAN_CONF;
	private items(text: string, config: any): string[] {
		const { splitLine, splitText } = this.scanConfig;
		const { key, value } = config;
		return text
			.split(splitText)
			.filter((i) => i.toLowerCase().match(key))
			.join(splitLine)
			.split(splitLine)
			.filter((i) => i.length > value);
	}

	protected fmtOcr(opt: any): any {
		const { device } = this.scanConfig;
		const { text, path } = opt;
		const mac = this.items(text, device.mac);
		const serialNo = this.items(text, device.serial);
		return { mac, serialNo, path, text };
	}

	async ocrRead(path: string): Promise<any> {
		console.log('path', path)
		const { lang, filePathTmpl } = this.scanConfig;
		const filePath = this.tmpl(filePathTmpl).obj({ ...process, path });
		return Tesseract.recognize(filePath, lang, { logger: (m) => m }).then(({ data: { text } }) => {
			this.removeImage(filePath);
			return this.fmtOcr({ path, text });
		});
	}

	private removeImage(filePath: string): void {
		const { fileRemoveTmpl } = this.scanConfig;
		const cmd = this.tmpl(fileRemoveTmpl).obj(filePath);
		this.execProcess(cmd).then((stdout: any) => {
			console.log('stdout', stdout);
		});
	}
}
