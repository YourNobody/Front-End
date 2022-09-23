import {FC, Fragment} from "react";
import {IHandleImagesProcess} from "@Interfaces/helpers.interface";
import {statuses} from "@Constants";

export const wrapWithFragment = (Element: FC<any>, props: any) => <Fragment><Element {...props}/></Fragment>;

export const wrapWithWindowClickEvent = (callback) => {
	function onClick() {
		callback();
		window.removeEventListener('click', onClick);
	}

	setTimeout(() => window.addEventListener('click', onClick), 0);
}

export const handleImagesProcessing = async (event: Event, options: IHandleImagesProcess) => {
	if (!event) return;

	const target = event.target as HTMLInputElement;

	const { maxImagesQuantity, existingImagesQuantity, callback, alertFunction } = options;

	if (!target || !target.files.length) return;
	const files = Array.from(target.files).filter(file => file.type.split('/')[0] === 'image');

	if (existingImagesQuantity > maxImagesQuantity || files.length > maxImagesQuantity || files.length + existingImagesQuantity > maxImagesQuantity)
		return alertFunction(`It's not possible to add more than 2 images`, statuses.WARNING);

	const promises = files.map(file => {
		const reader = new FileReader();
		return new Promise(res => {
			const {name, size, type} = file;
			reader.readAsDataURL(file);

			reader.onload = ev => {
				res(ev.target.result);
				callback && callback({
					name, size, type,
					imageBase64: ev.target.result as string,
					imageId: file.name
				});
			};
		})
	});

	return (Promise as any).allSettled(promises)
}