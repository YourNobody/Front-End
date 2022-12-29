import cn from "classnames";
import styles from "../Change/Change.module.scss";
import {Card, HTag, Image} from "@Components";
import {Link} from "react-router-dom";
import {routes} from "@Constants";
import React, {FC} from "react";
import {SettingsProps} from "./Settings.props";
import {useTypedSelector} from "@Hooks";

export const Settings: FC<SettingsProps> = ({ className, ...props }) => {
	const { user } = useTypedSelector(state => state.user);

	return <Card {...props} className={cn(className, styles.changeWrapper)}>
		<HTag className={styles.title}>Personal Information</HTag>
		<div>
			<div className={styles.option}>
				<HTag size="s">Account Image</HTag>
				<div className={styles.optionAvatar}>
					<span>Your account image:&nbsp;</span>
					<Image src={user.avatar} className={styles.avatar}/>
				</div>
			</div>
			<div className={styles.option}>
				<HTag size="s">Nickname</HTag>
				<span>Your nickname:&nbsp;{user.nickname}</span>
			</div>
			<div className={styles.option}>
				<HTag size="s">Email</HTag>
				<span>Your email:&nbsp;{user.email}</span>
			</div>
			<div className={styles.option}>
				<HTag size="s">Password</HTag>
				<span>Your password hasn't been changed since 11 (...age)</span>
			</div>
		</div>
		<div className={styles.changeInfo}>
			<HTag className={styles.changeInfoTitle}>Account actions:</HTag>
			<Link to={routes.PROFILE.ACCOUNT_CHANGE_AVATAR}>Change account image</Link>
			<Link to={routes.PROFILE.ACCOUNT_CHANGE_NAME}>Change nickname</Link>
			<Link to={routes.PROFILE.ACCOUNT_CHANGE_EMAIL}>Change email</Link>
			<Link to={routes.PROFILE.ACCOUNT_CHANGE_PASSWORD}>Change password</Link>
		</div>
	</Card>;
}