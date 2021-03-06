let contentfulConfig, config;

try {
	// Load the Contentful config from the .contentful.json
	config = require('./.contentful');
	contentfulConfig = config;
} catch (_) {}

// Overwrite the Contentful config with environment variables if they exist
contentfulConfig = {
	spaceId: process.env.CONTENTFUL_SPACE_ID || contentfulConfig.spaceId,
	accessToken:
		process.env.CONTENTFUL_DELIVERY_TOKEN || contentfulConfig.accessToken,
};

if (process.env.ACTIVE_ENV) {
	contentfulConfig['host'] = config.host;
	contentfulConfig['accessToken'] = config.devAccessToken;
}

const { spaceId, accessToken } = contentfulConfig;

if (!spaceId || !accessToken) {
	throw new Error(
		'Contentful spaceId and the delivery token need to be provided.'
	);
}

module.exports = {
	siteMetadata: {
		title: 'Andrew’s Making a Gatsby Site',
	},
	plugins: [
		'gatsby-transformer-remark',
		'gatsby-plugin-react-helmet',
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: 'andrewhudson.me',
				short_name: 'andrewhudson.me',
				start_url: '/',
				background_color: '#663399',
				theme_color: '#663399',
				display: 'minimal-ui',
				icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
			},
		},
		'gatsby-plugin-offline',
		{
			resolve: 'gatsby-source-contentful',
			options: contentfulConfig,
		},
		{
			resolve: `gatsby-source-wordpress`,
			options: {
				baseUrl: `big-andy.co.uk`,
				protocol: `https`,
				hostingWPCOM: false,
				useACF: false,
				excludedRoutes: [
					'/*/*/comments',
					'/yoast/*',
					'/bigandy/**',
					'/oembed/**',
					'/gutenberg/**',
					// '/*/*/posts/',
					// '/*/*/pages/',
					'/*/*/media',
					'/*/*/health',
					'/*/*/blocks',
					'/*/*/types',
					'/*/*/statuses',
					'/*/*/taxonomies',
					'/*/*/categories',
					'/*/*/tags',
					'/*/*/users',
					'/*/*/comments',
					'/*/*/settings',
				],
			},
		},
	],
};
