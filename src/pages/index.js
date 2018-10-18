import React from 'react';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';

import Layout from '../components/layout';

const metresToMiles = metres => {
	return (metres / 1609.344).toFixed(2) + 'miles';
};

class IndexPage extends React.Component {
	render() {
		const WordPressPosts = get(this, 'props.data.allWordpressPost.edges');
		const ContentfulPosts = get(
			this,
			'props.data.allContentfulBlogPost.edges'
		);

		const activities = this.props.data.allActivity.edges;

		return (
			<Layout>
				<h1>Hi people, welcome to my Gatsby Site</h1>

				<p>Currently experimenting with GraphQL and Gatsby. Excuse the design.</p>

				<h2>
					<Link to="/wordpress-blog/">WordPress Posts</Link>
				</h2>

				{WordPressPosts.map(({ node }) => {
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

				<h2>
					<Link to="/contentful-blog/">Contentful Posts</Link>
				</h2>
				{ContentfulPosts.map(({ node }) => {
					return (
						<article key={node.slug}>
							{node.date}
							<br />
							<Link to={'/contentful-blog/' + node.slug}>
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

				<h2>
					<Link to="/strava/">Strava Feed</Link>
				</h2>
				{activities.map(activity => {
					return (
						<li key={activity.node.id}>
							<a
								href={`https://www.strava.com/activities/${
									activity.node.id
								}`}
							>
								{activity.node.name} -{' '}
								{metresToMiles(activity.node.distance)}
							</a>
						</li>
					);
				})}
			</Layout>
		);
	}
}

export default IndexPage;

export const pageQuery = graphql`
	query IndexWordPressPostsQuery {
		allWordpressPost(sort: { fields: [date], order: DESC }, limit: 3) {
			edges {
				node {
					title
					slug
					excerpt
					date(formatString: "MMMM DD, YYYY")
				}
			}
		}

		allContentfulBlogPost(
			sort: { fields: [publishDate], order: DESC }
			limit: 2
		) {
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

		allActivity(limit: 5) {
			edges {
				node {
					id
					name
					distance
				}
			}
		}
	}
`;
