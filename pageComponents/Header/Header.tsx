import {FC, useEffect, useState} from 'react';
import {HeaderProps} from './Header.props';
import styles from './Header.module.scss';
import cn from 'classnames';
import {Link} from 'react-router-dom';
import {routes} from '../../constants/routes';
import {Image} from '../../components/index';
import {useTypedSelector} from '../../hooks/useTypedSelector.hook';
import {quizesNames} from "@Constants";
import {wrapWithWindowClickEvent} from "../../helpers/react.helper";

export const Header: FC<HeaderProps> = ({className, ...props}) => {
	const {user, accessToken} = useTypedSelector(state => state.user);

	const [isToCreate, setIsToCreate] = useState<boolean>(false);

	const handleIsToCreate = () => {
		setIsToCreate(true);

		wrapWithWindowClickEvent(() => setIsToCreate(false));
	}

	return (
		<header className={cn(styles.header, className)} {...props}>
			<nav className={styles.nav}>
				<ul className={styles.navList}>
					<Link to={routes.HOME}>
						<li>Home</li>
					</Link>
					<Link to={routes.QUIZZES.ROOT}>
						<li>Quizes</li>
					</Link>
				</ul>
				{
					!accessToken && <div className={styles.person}>
            <div className={cn(styles.question, styles.login)}>
              <Link to={routes.AUTH.LOGIN}>Log in</Link>
            </div>
          </div>
				}
				{accessToken && <div className={styles.person}>
          <div>
            <div
	            className={cn(styles.question, styles.create, {
								[styles.active]: isToCreate
	            })}
              onClick={handleIsToCreate}
            >Create Quiz</div>
						{isToCreate ? <ul className={styles.createList}>
							{
								Object.entries(quizesNames).map(quiz => {
									return <li key={quiz[0]}>
										<Link to={`${routes.QUIZZES.ROOT}/${quiz[0]}/create`}>{quiz[1]}</Link>
									</li>
								})
							}
						</ul> : <></>
						}
          </div>
          <div className={styles.personInfo}>
            <Link to={routes.PROFILE.ACCOUNT}>
              <div className={styles.name}>{user.nickname}</div>
              <Image isCircled={true} text={user.nickname} className={styles.image}/>
            </Link>
          </div>
        </div>
				}
			</nav>
		</header>
	);
};