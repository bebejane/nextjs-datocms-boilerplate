import styles from "./ExternalLink.module.scss"
import cn from "classnames";

type ExternalLinkProps = { linkText:string, url:string }

export default function ExternmalLink({ linkText, url } : ExternalLinkProps) {
	return (
		<a href={url} className={styles.externalLink}>
			{linkText}
		</a>
	);
}