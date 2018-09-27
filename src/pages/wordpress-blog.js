import React from 'react';
import Link from 'gatsby-link';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import Layout from '../components/layout';

class BlogIndex extends React.Component {
	render() {
		const siteTitle = get(this, 'props.data.site.siteMetadata.title');
		const posts = get(this, 'props.data.allWordpressPost.edges');

		return (
			<Layout>
				<Helmet title={siteTitle} />
				<div className="wrapper">
					<h2 className="section-headline">
						Recent posts from big-andy.co.uk WordPress
					</h2>
					{posts.map(({ node }) => {
						return (
							<article key={node.slug}>
								{node.date}
								<br />
								<Link to={'/wordpress-blog/' + node.slug}>
									{node.title}
								</Link>
								<span
									dangerouslySetInnerHTML={{
										__html: node.excerpt,
									}}
								/>
							</article>
						);
					})}
				</div>
			</Layout>
		);
	}
}

export default BlogIndex;

export const pageQuery = graphql`
	query WordPressPostsQuery {
		allWordpressPost(sort: { fields: [date], order: DESC }, limit: 5) {
			edges {
				node {
					title
					slug
					excerpt
					date(formatString: "MMMM DD, YYYY")
				}
			}
		}
	}
`;
