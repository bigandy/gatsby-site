const path = require('path');
const _ = require('lodash');
const slash = require('slash');

exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions;

	return new Promise((resolve, reject) => {
		const blogPost = path.resolve(
			'./src/templates/contentful-blog-post.js'
		);
		graphql(
			`
				{
					allContentfulBlogPost {
						edges {
							node {
								title
								slug
								description {
									childMarkdownRemark {
										html
									}
								}
							}
						}
					}
				}
			`
		)
			.then(result => {
				if (result.errors) {
					console.log(result.errors);
					reject(result.errors);
				}

				const contentfulPosts = result.data.allContentfulBlogPost.edges;
				contentfulPosts.forEach((post, index) => {
					createPage({
						path: `/contentful-blog/${post.node.slug}/`,
						component: blogPost,
						context: {
							slug: post.node.slug,
						},
					});
				});
			})
			// END OF Contentful Posts
			.then(() => {
				// ==== PAGES (WORDPRESS NATIVE) ====
				graphql(
					`
						{
							allWordpressPage {
								edges {
									node {
										id
										slug
										status
										template
									}
								}
							}
						}
					`
				).then(result => {
					if (result.errors) {
						console.log(result.errors);
						reject(result.errors);
					}

					// Create Page pages.
					const pageTemplate = path.resolve(
						`./src/templates/page.js`
					);
					// We want to create a detailed page for each
					// page node. We'll just use the Wordpress Slug for the slug.
					// The Page ID is prefixed with 'PAGE_'
					_.each(result.data.allWordpressPage.edges, edge => {
						// Gatsby uses Redux to manage its internal state.
						// Plugins and sites can use functions like "createPage"
						// to interact with Gatsby.
						createPage({
							// Each page is required to have a `path` as well
							// as a template component. The `context` is
							// optional but is often necessary so the template
							// can query data specific to each page.
							path: `/${edge.node.slug}/`,
							component: pageTemplate,
							context: {
								id: edge.node.id,
							},
						});
					});
				});
				// ==== END PAGES ====
			})
			// END of WordPress Pages
			.then(() => {
				// ==== PAGES (WORDPRESS NATIVE) ====
				graphql(
					`
						{
							allWordpressPost {
								edges {
									node {
										id
										slug
										title
									}
								}
							}
						}
					`
				).then(result => {
					if (result.errors) {
						console.log(result.errors);
						reject(result.errors);
					}

					// Create Page pages.
					const pageTemplate = path.resolve(
						`./src/templates/wordpress-post.js`
					);
					// We want to create a detailed page for each
					// page node. We'll just use the Wordpress Slug for the slug.
					// The Page ID is prefixed with 'PAGE_'
					_.each(result.data.allWordpressPost.edges, edge => {
						// Gatsby uses Redux to manage its internal state.
						// Plugins and sites can use functions like "createPage"
						// to interact with Gatsby.
						createPage({
							// Each page is required to have a `path` as well
							// as a template component. The `context` is
							// optional but is often necessary so the template
							// can query data specific to each page.
							path: `/wordpress-blog/${edge.node.slug}/`,
							component: pageTemplate,
							context: {
								id: edge.node.id,
							},
						});
					});
				});
				resolve();
				// ==== END Posts ====
			});
	});
};
