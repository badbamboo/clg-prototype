import { NestExpressApplication } from '@nestjs/platform-express';
import { Clg_Config } from '@model';
import { join } from 'path';
import { HelperUtilityService } from '@component/utility/helper-utility/helper-utility.service';

export class AppService extends HelperUtilityService {
	async init(app: NestExpressApplication, appPort?: number): Promise<any> {
		const appJson: Clg_Config = await this.setEnvVars();
		this.setPrefix(app);
		return app.listen(appPort || appJson.port, () => {
			console.log('appJson', appJson);
			return appJson;
		});
	}
	private setPrefix(app: NestExpressApplication): void {
		const { STATIC_FOLDER, STATIC_FOLDER_PATH } = <any>process.env;
		const publicStr: string = join(process.cwd(), STATIC_FOLDER);
		app.useStaticAssets(publicStr, { prefix: STATIC_FOLDER_PATH });
	}
}
