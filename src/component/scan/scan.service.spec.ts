import { Test, TestingModule } from '@nestjs/testing';
import { HelperUtilityService } from '@utility';
import { ScanService } from '@component/scan/scan.service';
import { SCAN_CONF } from '@configuration';

class TestClass extends ScanService {
	_fmtOcr(opt: any): any {
		return this.fmtOcr(opt);
	}
}
describe('WebsecAuthLoginService', () => {
	let service: TestClass;
	let imagePath = ``;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [TestClass, HelperUtilityService]
		}).compile();

		service = module.get<TestClass>(TestClass);
		// await service.setEnvVars(process.cwd(), SSO_CONF);
	});

	it('ScanService should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should fmtOcr()', async () => {
		const option = {
			path: 'public/image_scan/0285f3c12d0ed3bfe842e50701f5fc0d',
			text: 'die .\n/ belkin.\nfwemo [ oo ID:WeMo 3EA\nLR 2\nSerial No 221302K01013EA foy\n0 00 ik\nMAC EC1A5977D924 i\n'
		};
		const data: any = service._fmtOcr(option);
		const { mac, serialNo, path, text } = data;
		imagePath = path;
		expect(mac).toBeDefined();
		expect(serialNo).toBeDefined();
		expect(path).toBeDefined();
		expect(text).toBeDefined();
		expect(Array.isArray(mac)).toEqual(true);
		expect(Array.isArray(serialNo)).toEqual(true);
	});
});
