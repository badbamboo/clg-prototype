export interface Clg_Config {
	appId: string;
	appUrl: string;
	appVersion: string;
	descriptions: string[];
	environment: string;
	inventory: any[];
	languages: Clg_Config_Lang[];
	port: number;
	tags: string[];
	[key: string]: any;
}

export interface Clg_Config_Lang {
	name: string;
	version: string;
	[key: string]: any;
}
