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

export interface Clg_Env_Var {
	APP_ID: string;
	APP_JSON_FILE: string;
	APP_JSON_PATH: string;
	APP_VERSION: string;
	APP_URL: string;
	STATIC_FOLDER: string;
	STATIC_FOLDER_PATH: string;
	TXT_DASH_TO_CAMELCASE: string;
	TXT_SLASH_TO_UNDERSCORE: string;
	TXT_SLASH_TO_CAMELCASE: string;
	TXT_UNDERSCORE_TO_DASH: string;
	TXT_CONCAT_LIST: string;
	TXT_SPLIT_EXTENSION: string;
	WORKING_DIR_PATH: string;
	[key: string]: any;
}

export interface Clg_Ocr_Upload_History {
	editor: string;
	isValid: boolean;
	timestamp: string;
}


export interface Clg_Ocr_Upload_Item {
	created: string;
	lastUpdated: string;
	ticketLink: string;
	ticketNumbers: number[];
	ticketType: string;
	ticketValidateHistory: Clg_Ocr_Upload_History[];
}


export interface Clg_Ocr_Upload_Response {
	trackingId: string;
	response: Clg_Ocr_Upload_Item;
	request: any;
	status: Clg_Status;
}

export interface Clg_Status {
	code: number;
	hasError: boolean;
	message: string;
}
