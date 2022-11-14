import { CONTRACT_CONF } from '@configuration';
const config = require(`${process.cwd()}/clg.json`)

const LOCALHOST = `http://localhost:10200`;
const SuperTest = require('supertest');
const supertest = SuperTest(LOCALHOST);

const PATH = CONTRACT_CONF.config.path
describe(`AppController`, () => {
	it(`should return ${PATH}`, async () => {
		await supertest
			.get(PATH)
			.expect(200)
			.expect((resp: any) => {
				const data: any = JSON.parse(resp.text);
				expect(data.appId).toEqual(config.appId);
			});
	});
});
