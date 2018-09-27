// src/pages/jokes.js

import React from 'react';
import Layout from '../components/layout'

export default class Jokes extends React.Component {
  _renderJokes = () => {
    const jokes = this.props.data.allJoke.edges;
    return jokes.map(joke => {
      return (
        <li key={joke.node.id}>
          <p>{joke.node.setup}</p>
          <p>{joke.node.punchline}</p>
        </li>
      );
    });
  };

  render() {
    return (
		<Layout>
			<ul className="Jokes">{this._renderJokes()}</ul>
		</Layout>
	)
  }
}

export const query = graphql`
  query JokesQuery {
    allJoke {
      edges {
        node {
          id
          setup
          punchline
        }
      }
    }
  }
`;
