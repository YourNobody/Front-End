import React, {FC, useState} from 'react';
import {ImageProps} from './Image.props';
import styles from './Image.module.scss';
import cn from 'classnames';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {getRandomColor} from '../../helpers/css.helper';
import {getFirstLetters} from '../../helpers/custom.helper';
import {Input} from "../Input/Input";

export const Image: FC<ImageProps> = ({
	fully = false,
	text,
	src,
	alt,
	fit = 'contain',
	isCircled = false,
	onClick,
	effect = 'blur',
	className,
	style,
	...props
}) => {
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);

	const formatText = (textToFormat: string) => {
		if (!textToFormat) return 'YOU';
		const splitted = textToFormat.split(/\s/g);

		if (splitted.length >= 2) {
			return splitted[0].substring(0, 1).toUpperCase() + splitted[1].substring(0, 1).toUpperCase();
		} else if (splitted.length === 1) {
			return splitted[0].substring(0, 1).toUpperCase();
		}
		return 'You';
	};

	const afterLoad = () => {
		setIsLoaded(true);
	}

	const onError = () => {
		setError(true);
	}

	const buildImage = (): JSX.Element => {
		return <LazyLoadImage
			onError={onError}
			afterLoad={afterLoad}
			// onClick={onClick}
			src={src}
			effect={effect}
			alt={alt}
			className={cn(styles.image, className, {
				[styles.cover]: fit === 'cover',
				[styles.contain]: fit === 'contain',
				[styles.fill]: fit === 'fill',
				[styles.none]: fit === 'none',
			})}
		/>;
	};

	const buildNoImage = (option: 'full' | 'none' = 'none'): JSX.Element => {
		return (
			<div
				{...props}
				// onClick={onClick}
				className={cn(styles.template, className, {
					[styles.circle]: isCircled,
					[styles.full]: option === 'full'
				})}
			>
        <span
	        data-text
	        className={styles.templateInitials}
        >{fully ? text : formatText(text)}</span>
			</div>
		);
	};

	return <>
		{
			src
				? <div className={styles.imageLoading} onClick={onClick} style={style}>
						<div className={cn(styles.tempImage, {
							[styles.loaded]: isLoaded || error
						})} style={{
								visibility: isLoaded ? 'visible' :
									!error ? 'hidden' : 'visible'
							}}>
							{error ? buildNoImage('full') : buildImage()}
						</div>
						<div className={cn(styles.tempImage, {
							[styles.loaded]: isLoaded || error,
							[styles.hide]: isLoaded || error
						})} style={{ visibility: isLoaded ? 'hidden' : 'visible' }}>
							{buildNoImage('full')}
						</div>
					</div>
				: buildNoImage()
		}
	</>
};