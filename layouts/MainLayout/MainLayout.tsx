import React, {FC, Profiler, useEffect} from 'react';
import {Helmet} from 'react-helmet';
import {Header, Footer} from '../../pageComponents/index';
import {MainLayoutProps} from './MainLayout.props';
import styles from './MainLayout.module.scss';
import {useTypedSelector} from "@Hooks";
import {Card} from "@Components";
import cn from "classnames";

const MainLayout: FC<MainLayoutProps> = ({
	children,
	title = 'Home', ...props
}): JSX.Element => {
	const isAuthChecked = useTypedSelector(state => state.user.isAuthChecked);

	useEffect(() => {}, []);

	return (
		<div
			{...props}
			className={cn(styles.layout, {
				[styles.isLoading]: !isAuthChecked
			})}
		>
			<Helmet>
				<meta name="Description" content="application: QuizSA App, frameworks: React & Express"/>
				<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
				<title>{'QuizSA App | ' + title}</title>
			</Helmet>
			{isAuthChecked ? <Header className={styles.header}/> : <></>}
			<main className={styles.body}>
				{
					isAuthChecked
						? children
						: <Card className={styles.loadingMessage}>App is loading...</Card>
				}
			</main>
			{/*<Footer className={styles.footer}/>*/}
		</div>
	)
}

const logTimes = (id, phase, actualTime, baseTime, startTime, commitTime) => {
	// console.log(`${id}'s ${phase} phase:`);
	// console.log(`Actual time: ${actualTime}`);
	// console.log(`Base time: ${baseTime}`);
	// console.log(`Start time: ${startTime}`);
	// console.log(`Commit time: ${commitTime}`);
};

export function withMainLayout<T extends MainLayoutProps>(Component: FC<T>) {
	return function (props: T): JSX.Element {
		return (
			<Profiler id="auth" onRender={logTimes}>
				<MainLayout title={props.title}>
					<Component {...props}/>
				</MainLayout>
			</Profiler>
		);
	};
}