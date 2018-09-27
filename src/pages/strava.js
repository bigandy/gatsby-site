// src/pages/strava.js

import React from 'react';
import Layout from '../components/layout'

export default class Activities extends React.Component {
  _renderActivities = () => {
    const activities = this.props.data.allActivity.edges;
    return activities.map(activity => {
      return (
        <li key={activity.node.id}>
		  <a href={ `https://www.strava.com/activities/${activity.node.id}` }>
			{activity.node.name} - {activity.node.id}
		  </a>
        </li>
      );
    });
  };

  render() {
    return (
		<Layout>
			<ul className="Jokes">{this._renderActivities()}</ul>
		</Layout>
	)
  }
}

export const query = graphql`
  query ActivityQuery {
    allActivity {
      edges {
        node {
          id,
		  name
        }
      }
    }
  }
`;
