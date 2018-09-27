import React from 'react';
import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Layout from '../components/layout';

class PostTemplate extends React.Component {
	render() {
		const post = this.props.data.wordpressPost;

		return (
			<Layout>
				<Link to={'/wordpress-blog'}>Back to WordPress Blog</Link>
				{post.date}
				<h1 dangerouslySetInnerHTML={{ __html: post.title }} />
				<div dangerouslySetInnerHTML={{ __html: post.content }} />
			</Layout>
		);
	}
}

PostTemplate.propTypes = {
	data: PropTypes.object.isRequired,
	edges: PropTypes.array,
};

export default PostTemplate;

export const pageQuery = graphql`
	query($id: String!) {
		wordpressPost(id: { eq: $id }) {
			title
			content
			date(formatString: "MMMM DD, YYYY")
		}
		site {
			siteMetadata {
				title
			}
		}
	}
`;
