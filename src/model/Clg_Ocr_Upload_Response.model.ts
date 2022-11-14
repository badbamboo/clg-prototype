import { Clg_Ocr_Upload_Item } from './Clg_Ocr_Upload_Item.model';
import { Clg_Status } from './Clg_Status.model';

export interface Clg_Ocr_Upload_Response {
	trackingId: string;
	response: Clg_Ocr_Upload_Item;
	request: any;
	status: Clg_Status;
}
