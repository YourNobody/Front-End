import styles from "./Change.module.scss";
import {Button, Card, HTag, Image, Input} from "../../../components";
import React, {FC, useRef, useState} from "react";
import {ChangeProps} from "./Change.props";
import {useForm} from "react-hook-form";
import {useActions} from "../../../hooks/useActions.hook";
import {useTypedSelector} from "../../../hooks/useTypedSelector.hook";
import cn from "classnames";
import {Link} from "react-router-dom";
import {routes, userInfoChangeOptions} from "@Constants";
import {handleImagesProcessing} from "../../../helpers/react.helper";

export const Change: FC<ChangeProps> = ({className, ...props}) => {
	const { register, handleSubmit, reset, setValue, formState } = useForm();
	const [avatar, setAvatar] = useState<string>('');
	const { loading, user } = useTypedSelector(state => state.user);
	const { changeUserInfo, setAppAlert, openModal } = useActions();

	const changeOption = userInfoChangeOptions[document.location.pathname.toLowerCase()];

	const inputAvatarRef = useRef<HTMLInputElement>(null);

	const submitChangeInfo = (formData) => {
		formData = Object.keys(formData).reduce((acc: any, key) => {
			if (formData[key]) acc[key] = formData[key];
			return acc;
		}, {});

		openModal({
			actionFunc: () => {},
			actionButtonName: 'Change',
			modalQuestion: `Do you really want to change ${changeOption === 'avatar' ? 'account image' : changeOption}`
		})
		console.log('formData: ', formData)
		// changeUserInfo(changeOption, formData);
	};

	const changeNameTemplate = <>
		<Input
			label="Your new name:"
			type="text"
			placeholder="Write you new name"
			disabled={loading}
			{...register("nickname")}
		/>
		<Input
			label="Password for the confirmation:"
			type="password"
			placeholder="Your password"
			disabled={loading}
			{...register("password")}
		/>
	</>;

	const changePasswordTemplate = <>
		<Input
		    label="New password:"
		    type="password"
		    placeholder="New password"
		    disabled={loading}
		    {...register("password")}
		/>
		<Input
		    label="Confirm password:"
		    type="password"
		    placeholder="Confirm password"
		    disabled={loading}
		    {...register("confirm")}
		/>
		<Input
		    label="Old password:"
		    type="password"
		    placeholder="Old password"
		    disabled={loading}
		    {...register("oldPassword")}
		/>
	</>;

	const changeEmailTemplate = <>
		<Input
		    label="New Email:"
		    type="email"
		    formNoValidate={true}
		    disabled={loading}
		    placeholder="New Email"
		    {...register("email")}
		/>
		<Input
		    label="Password for the confirmation:"
		    type="password"
		    placeholder="Your password"
		    disabled={loading}
		    {...register("password")}
		/>
	</>;

	const changeAvatarTemplate = <>
		<Input
			type="file"
			disabled={loading}
			ref={inputAvatarRef}
			onChange={e => handleImagesProcessing(e as any, {
				maxImagesQuantity: 1,
				existingImagesQuantity: 0,
				callback: (image) => {
					setAvatar(image.imageBase64);
					setValue('avatar', image);
				},
				alertFunction: setAppAlert
			})}
		/>
		<Button onClick={() => inputAvatarRef.current.click()}>Choose image</Button>
		<Image src={avatar} fit="cover" text="No image loaded" fully={true} className={styles.previewAvatar}/>
	</>;

	const templates = {
		nickname: changeNameTemplate,
		email: changeEmailTemplate,
		password: changePasswordTemplate,
		avatar: changeAvatarTemplate
	};

	const titles = {
		nickname: {
			title: 'Change of the account name',
			button: 'Change Name'
		},
		email: {
			title: 'Change of the account email',
			button: 'Change Password'
		},
		password: {
			title: 'Change of the password',
			button: 'Change Email'
		},
		avatar: {
			title: 'Account image change',
			button: 'Change image'
		}
	};

	return (
		<Card {...props} className={cn(className, styles.changeWrapper)}>
			<form onSubmit={handleSubmit(submitChangeInfo)}>
				<HTag className={styles.formTitle} size="l">{titles[changeOption].title}</HTag>
				{
					templates[changeOption]
				}
				<Button type="submit" disabled={loading}>{titles[changeOption].button}</Button>
			</form>
		</Card>
	);
};