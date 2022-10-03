import styles from './index.module.scss'
import { GetStaticProps } from 'next'
import { AllPostsDocument } from '/graphql';
import withGlobalProps from "/lib/withGlobalProps";
import Markdown from '/lib/dato/components/Markdown';
import React from 'react';
import { apiQuery } from '/lib/dato/api';

export type HomeProps = { site:Site , allPosts: PostRecord[]}

export default function Home({site, allPosts } : HomeProps) {
	return (
		<div className={styles.container}>
			{allPosts.map(({title, content}, key)=>
				<React.Fragment key={key}>
					<h1>{title}</h1>
					<Markdown>{content}</Markdown>
				</React.Fragment>
			)}
		</div>
	)
}

export const config = { 
	runtime:'experimental-edge'

}


export const getServerSideProps = async function(){

	const props = await apiQuery(AllPostsDocument, {})

	return {
		props
	};
};

/*
export const getStaticProps : GetStaticProps = withGlobalProps({queries:[AllPostsDocument]}, async ({props, revalidate } : any) => {
	
	return {
		props,
		revalidate
	};
});

*/