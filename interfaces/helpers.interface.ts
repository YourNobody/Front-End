import {statuses} from "@Constants";
import {IAppAlertOptions} from "@Interfaces/actions.interface";

export interface IHandleImagesProcess {
	maxImagesQuantity: number;
	existingImagesQuantity: number;
	alertFunction: (message: string, statuses: statuses, options?: IAppAlertOptions) => void,
	callback?: (images: IImageProcessed) => any;
}

export type IHandleImagesProcessReturn = Promise<IImageProcessed[]>;

export interface IImageProcessed {
	imageBase64: string;
	type: string;
	size: number;
	name: string;
	imageId: string;
}