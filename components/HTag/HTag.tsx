import React, {FC} from 'react';
import {HTagProps} from './HTag.props';
import styles from './HTag.module.css';

export const HTag: FC<HTagProps> = ({
	children,
	size = 'm',
	className,
	...props
}) => {
	switch (size) {
		case 'small':
		case 's': {
			return <h3 className={className} {...props}>{children}</h3>;
		}
		case 'medium':
		case 'm': {
			return <h2 className={className} {...props}>{children}</h2>;
		}
		case 'large':
		case 'l': {
			return <h1 className={className} {...props}>{children}</h1>;
		}
		default:
			return <h2 className={className} {...props}>{children}</h2>;
	}
};