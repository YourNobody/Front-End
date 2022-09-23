import React, {FC, useEffect, useRef, useState} from 'react';
import {ProfileProps} from './Profile.props';
import styles from './Profile.module.scss';
import {withMainLayout} from '@Layouts';
import {Link, Route, Switch, useHistory} from 'react-router-dom';
import {routes} from '@Constants';
import {useTypedSelector, useActions} from '@Hooks';
import {QuizStats} from './QuizStats/QuizStats';
import {Subscription} from './Subscription/Subscription';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js'
import {Button, Card, HTag, Image, Input} from "@Components";
import {Change} from "./Change/Change";
import cn from "classnames";
import {Settings} from "./Settings/Settings";

const acceptedFiles = ".jpg,.png,.jpeg";

export const Profile: FC<ProfileProps> = (props) => {
	const history = useHistory();
	const {stripeToken} = useTypedSelector(state => state.app);
	const {user} = useTypedSelector(state => state.user);
	const {logoutUser, openModal, closeModal, changeUserAvatar} = useActions();

	const inputLoadAvatarRef = useRef<HTMLInputElement>(null);

	useEffect(() => {}, [user])

	const handleAvatarChange = (e: any) => {
		if (!e.target && !e.target.files[0]) return;

		const file = e.target.files[0];
		const reader = new FileReader();

		reader.readAsDataURL(file);

		reader.onload = ev => {
			changeUserAvatar(ev.target.result.toString());
		};
	};

	const handleRedirect = (event) => {
		if (!event || !event.target) return;

		const { tagName, dataset } = event.target;

		if (tagName === 'BUTTON' && dataset && dataset.route) {
			history.push(dataset.route);
		}
	};

	const handleOpenModal = () => {
		const callback = () => {
			logoutUser(() => history.push(routes.HOME));
			closeModal();
		};

		openModal({
			actionFunc: callback,
			actionButtonName: 'Log Out',
			closeButtonName: 'Stay on page',
			modalQuestion: 'Do you really want to log out?'
		});
	};

	return (
		<div {...props} className={styles.profile}>
			<Card className={styles.sidebar}>
				<div>
					<Input
						type="file"
						accept={acceptedFiles}
						ref={inputLoadAvatarRef}
						onChange={handleAvatarChange}
						multiple={false}
					/>
					<div className={styles.avatarWrapper}>
						<Image
							src={user.avatar}
							className={styles.avatar}
							onClick={() => inputLoadAvatarRef.current.click()}
						/>
					</div>
					<HTag className={styles.nickname}>{user.nickname}</HTag>
				</div>
				<div>
					<ul className={styles.navList}>
						<li><Link to={routes.PROFILE.QUIZZES}>My Quizzes</Link></li>
						<li><Link to={routes.PROFILE.SUBSCRIPTION}>Subscriptions</Link></li>
						<li><Link to={routes.PROFILE.SETTINGS}>Settings</Link></li>
					</ul>
				</div>
				<div className={styles.logout} onClick={handleOpenModal}>Log Out</div>
			</Card>
			<div>
				<Switch>
					<Route path={routes.PROFILE.ACCOUNT} exact>
						<Card className={cn(styles.cardPage, styles.cardRootPage)}>
							<HTag>Hi, <span className={styles.nickname}>{user.nickname}</span></HTag>
							<div className={styles.buttons} onClick={handleRedirect}>
								<Button data-route={routes.PROFILE.QUIZZES}>Quizzes</Button>
								<Button data-route={routes.PROFILE.SUBSCRIPTION}>Subscriptions</Button>
								<Button data-route={routes.PROFILE.SETTINGS}>Settings</Button>
							</div>
						</Card>
					</Route>
					<Route path={routes.PROFILE.SUBSCRIPTION} exact>
						<Elements stripe={loadStripe(stripeToken)}>
							<Subscription className={styles.cardPage}/>
						</Elements>
					</Route>
					<Route path={routes.PROFILE.QUIZZES} exact>
						<QuizStats />
					</Route>
					<Route path={routes.PROFILE.SETTINGS} exact>
						<Settings className={styles.cardPage}/>
					</Route>
					<Route path={routes.PROFILE.ROOT}>
						<Change className={styles.cardPage}/>
					</Route>
				</Switch>
			</div>
		</div>
	);
};

export default withMainLayout(Profile);