// plugins/ah-random-jokes/gatsby-node.js

const axios = require('axios');
const crypto = require('crypto');

const API_URI =
  'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten';

exports.sourceNodes = async ({actions}) => {
  const {createNode} = actions;
  const result = await axios.get(API_URI);
  for (const joke of result.data) {
    await createNode({
      children: [],
      id: joke.id.toString(),
      setup: joke.setup,
      punchline: joke.punchline,
      parent: null,
      internal: {
        type: 'Joke',
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(joke))
          .digest(`hex`),
      },
    });
  }
};
