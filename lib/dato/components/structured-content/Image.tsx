import styles from "./Image.module.scss"
import cn from "classnames";
import { Image as DatoImage } from 'react-datocms'

type ImageProps = { data: any, lazyLoad?:boolean, showCaption?: boolean }

export default function Image({ data, lazyLoad, showCaption = true } : ImageProps) {
	if(!data) return null
	
	const { title, responsiveImage } = data;

	return (
		<figure className={styles.image}>
			<DatoImage data={responsiveImage} lazyLoad={lazyLoad}/>
			{showCaption &&
				<caption className={styles.caption}>{title}</caption>
			}
		</figure>
	);
}
