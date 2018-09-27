// plugins/ah-random-jokes/gatsby-node.js

const axios = require('axios');
const crypto = require('crypto');

const API_URI = 'https://www.strava.com/api/v3/activities';

exports.sourceNodes = async ({ actions }) => {
	const { createNode } = actions;
	const result = await axios.get(API_URI, {
		headers: {
			Authorization: `Bearer 71706798d2ff3d38571efe2a5e73d4e0d1454ac6`,
		},
	});

	for (const activity of result.data) {
		await createNode({
			children: [],
			id: activity.id.toString(),
			name: activity.name.toString(),
			// setup: joke.setup,
			// punchline: joke.punchline,
			parent: null,
			internal: {
				type: 'Activity',
				contentDigest: crypto
					.createHash(`md5`)
					.update(JSON.stringify(activity))
					.digest(`hex`),
			},
		});
	}
};
