import { Clg_Ocr_Upload_History } from './Clg_Ocr_Upload_History.model';

export interface Clg_Ocr_Upload_Item {
	created: string;
	lastUpdated: string;
	ticketLink: string;
	ticketNumbers: number[];
	ticketType: string;
	ticketValidateHistory: Clg_Ocr_Upload_History[];
}
