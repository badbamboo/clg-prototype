import { CONTRACT_CONF } from '@configuration';
const config = require(`${process.cwd()}/clg.json`);

const LOCALHOST = `http://localhost:10200`;
const SuperTest = require('supertest');
const supertest = SuperTest(LOCALHOST);

const PATH = CONTRACT_CONF.scan.path;
const FILE =`${process.cwd()}/image/mac1.png`

describe(`ScanController`, () => {
	it(`should return ${PATH}`, async () => {
		await supertest
			.post(PATH)
			.set('Content-Type', 'multipart/form-data')
			.attach('imageFile', FILE)
			.expect((resp: any) => {
				const data: any = JSON.parse(resp.text);
				const { mac, serialNo, text, path } = data;
				expect(mac).toBeDefined();
				expect(serialNo).toBeDefined();
				expect(path).toBeDefined();
				expect(text).toBeDefined();
				expect(Array.isArray(mac)).toEqual(true);
				expect(Array.isArray(serialNo)).toEqual(true);
			});
	});
});
