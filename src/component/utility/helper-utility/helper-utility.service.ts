import { Injectable } from '@nestjs/common';
import { APP_CONF } from '@configuration';
import { HttpUtilityService } from '@component/utility/http-utility/http-utility.service';
import _ = require('lodash');
import childProcess = require('child_process');
import CryptoJS from 'crypto-js';
import fs = require('fs');
import { Clg_Config, Clg_Env_Var } from '@model';

@Injectable()
export class HelperUtilityService extends HttpUtilityService {
	appConf = <any>APP_CONF;

	async execProcess(cmd: string): Promise<any> {
		const { exec } = childProcess;
		return new Promise((resolve) => {
			exec(cmd, (error, stdout, stderr) => {
				if (error || stderr) {
					console.error(`ERROR: `, error || stderr);
				}
				resolve(<any>stdout);
			});
		});
	}

	decrypt(str: string, appId: string): Record<string, unknown> {
		const bytes = CryptoJS.AES.decrypt(str, appId);
		const decryptedStr: any = bytes.toString(CryptoJS.enc.Utf8);
		return JSON.parse(decryptedStr);
	}

	encrypt(data: any, appId: string): string {
		const message: string = typeof data === `string` ? data : JSON.stringify(data);
		const encrypted = CryptoJS.AES.encrypt(message, appId);
		return encrypted.toString();
	}

	async fmtEnvironmentVars(): Promise<any> {
		const { exec } = childProcess;
		const cmd = `printenv`;
		const { TXT_CONCAT_LIST } = <any>process.env;
		return new Promise((resolve) => {
			exec(cmd, (error, stdout, stderr) => {
				if (error || stderr) {
					console.error(`ERROR: `, error || stderr);
				}
				const list: string[] = stdout.split(`\n`).map((i: string) => i.replace(`=`, `||`));
				const option: any = Object.assign({}, ...list.filter((i: string) => i.split(`||`)[1]).map((item: string) => ({ [item.split(`||`)[0]]: item.split(`||`)[1] })));
				const { VAULT_RENDER_DIR, VAULT_RENDER_FILE, VAULT_TEMPLATE_DIR, VAULT_TEMPLATE_FILE } = option;
				process.env.VAULT_TEMPLATE_PATH = this.tmpl(TXT_CONCAT_LIST).obj([VAULT_TEMPLATE_DIR, VAULT_TEMPLATE_FILE]);
				process.env.VAULT_RENDER_PATH = this.tmpl(TXT_CONCAT_LIST).obj([VAULT_RENDER_DIR, VAULT_RENDER_FILE]);
				resolve(<any>process.env);
			});
		});
	}

	async fmtAppJson(): Promise<any> {
		const { APP_JSON_PATH, WORKING_DIR_PATH } = <any>process.env;
		const filePath: string = this.tmpl(APP_JSON_PATH).obj(WORKING_DIR_PATH);
		const data: string = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
		const appJson: any = JSON.parse(data);
		return this.fmtEnvironmentVars().then((option: any) => {
			const { ENVIRONMENT } = option;
			process.env.APP_URL = appJson.appUrl;
			appJson.environment = ENVIRONMENT;
			process.env.APP_JSON_FILE = JSON.stringify(appJson);
			return appJson;
		});
	}

	getAppConfig(): Clg_Env_Var {
		return <any>this.appConf;
	}
	getAppJson(): Clg_Config {
		const { APP_JSON_FILE } = process.env;
		return JSON.parse(APP_JSON_FILE);
	}

	keys(obj: any): string[] {
		return _.keys(obj);
	}

	appInventory(): any {
		const inventory: any[] = this.getAppJson().inventory;
		const { TXT_DASH_TO_CAMELCASE, TXT_SLASH_TO_CAMELCASE } = <any>process.env;
		return Object.assign(
			{},
			...inventory.map((inv: any) => {
				const key: string = this.tmpl(TXT_DASH_TO_CAMELCASE).obj(inv.appId);
				if (inv.endpoints) {
					Object.assign(
						inv,
						...inv.endpoints.map((endpoint: string) => {
							const item: string = this.tmpl(TXT_SLASH_TO_CAMELCASE).obj(endpoint);
							return { [item]: endpoint };
						})
					);
				}
				return { [key]: inv };
			})
		);
	}

	tmpl(str: string): any {
		const compiled = _.template(str);
		return <any>{
			obj: (obj: any) => {
				let val: any = typeof obj === `string` ? { key: obj } : obj;
				val = Array.isArray(val) ? { list: obj } : val;
				return compiled(val);
			}
		};
	}

	async setEnvVars(): Promise<any> {
		this.keys(this.appConf).filter((key: string) => {
			process.env[key] = `${this.appConf[key]}`;
		});
		process.env.WORKING_DIR_PATH = process.cwd();
		return await this.fmtAppJson();
	}

	trackingId(): string {
		const { appId } = this.getAppJson();
		return `${_.now()}${appId}`;
	}

	async writeFile(filePath: string, contentTxt: string): Promise<any> {
		return new Promise((resolve) => {
			fs.writeFile(filePath, contentTxt, (err: any) => {
				if (err) {
					console.error(err);
				} else {
					return resolve(contentTxt);
				}
			});
		});
	}
}
