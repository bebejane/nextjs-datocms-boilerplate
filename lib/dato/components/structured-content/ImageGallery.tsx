import styles from "./ImageGallery.module.scss"
import cn from "classnames";
import Image from "./Image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useEffect, useState } from "react";

type ImageGalleryProps = { images:[any], id:string }

export default function ImageGallery({ images, id } : ImageGalleryProps) {

	const [index, setIndex] = useState<number>(0)
	const [captionHeight, setCaptionHeight] = useState<number>()
	const [lazyLoad, setLazyLoad] = useState(false)

	useEffect(() => {
		const height = document.querySelectorAll(`#ig-${id} > caption`)[index]?.clientHeight as number;
		setCaptionHeight(height)
	}, [index])
	
	useEffect(()=>{
		setTimeout(()=>setLazyLoad(true), 2000)
	}, [])

	return (
		<section className={styles.imageGallery}>
			<Carousel
				showThumbs={false}
				showStatus={false}
				showArrows={true}
				dynamicHeight={false}
				emulateTouch={true}
				selectedItem={index}
				onClickItem={() => setIndex(index + 1 < images.length ? index + 1 : 0)}
				onChange={(i) => setIndex(i)}
				renderThumbs={(children) => images.map((image, index) =>
					<div className={styles.thumbWrap} key={index}>
						<img src={`${image.url}?h=50`} />
					</div>
				)}
				renderIndicator={(onClick, selected, index) =>
					<span
						key={index}
						className={cn(styles.indicator, selected && styles.selected)}
						onClick={onClick}>
					</span>
				}
				renderArrowNext={(onClick, haveNext, label) =>
					<div className={cn(styles.arrow, styles.next, !haveNext && styles.disabled)} onClick={onClick}>
						→
					</div>
				}
				renderArrowPrev={(onClick, havePrevious, label) =>
					<div className={cn(styles.arrow, styles.prev, !havePrevious && styles.disabled)} onClick={onClick}>
						←
					</div>
				}
			>
				{images.map((image, i) =>
					<Image key={i} data={image} showCaption={false} lazyLoad={lazyLoad}/>
				)}
			</Carousel>
			<div
				className={styles.captions}
				id={`ig-${id}`}
				style={{ height: captionHeight || 'auto' }}
			>
				{images.map((image, idx) =>
					<caption key={idx} className={cn(styles.caption, idx === index && styles.show)}>
						{image.title}
					</caption>
				)}
			</div>
		</section>
	);
}