let contentfulConfig,
	config;

try {
	// Load the Contentful config from the .contentful.json
	config = require('./.contentful')
	contentfulConfig = config;
} catch (_) { }

// Overwrite the Contentful config with environment variables if they exist
contentfulConfig = {
	spaceId: process.env.CONTENTFUL_SPACE_ID || contentfulConfig.spaceId,
	accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN || contentfulConfig.accessToken,
}

if (process.env.ACTIVE_ENV) {
	contentfulConfig['host'] = config.host;
	contentfulConfig['accessToken'] = config.devAccessToken;
}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
	throw new Error(
		'Contentful spaceId and the delivery token need to be provided.'
	)
}


module.exports = {
	siteMetadata: {
		title: 'Andrew’s Making a Gatsby Site',
	},
	plugins: [
		'ah-random-jokes',
		'ah-strava',
		'gatsby-transformer-remark',
		'gatsby-plugin-react-helmet',
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: 'gatsby-starter-default',
				short_name: 'starter',
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
	],
}
