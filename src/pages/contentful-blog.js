import React from 'react';
import Link from 'gatsby-link';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import Layout from '../components/layout';

class BlogIndex extends React.Component {
	render() {
		const siteTitle = get(this, 'props.data.site.siteMetadata.title');
		const posts = get(this, 'props.data.allContentfulBlogPost.edges');

		return (
			<Layout>
				<Helmet title={siteTitle} />
				<div className="wrapper">
					<h2 className="section-headline">Contentful Blog</h2>
					<ul className="article-list">
						{posts.map(({ node }) => {
							return (
								<li key={node.slug}>
									<Link to={'/contentful-blog/' + node.slug}>
										{node.title}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			</Layout>
		);
	}
}

export default BlogIndex;

export const pageQuery = graphql`
	query BlogIndexQuery {
		allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
			edges {
				node {
					title
					slug
					publishDate(formatString: "MMMM Do, YYYY")
					tags
					description {
						childMarkdownRemark {
							html
						}
					}
				}
			}
		}
	}
`;
