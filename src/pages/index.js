import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

const IndexPage = () => (
	<Layout>
		<h1>Hi people, welcome to my Gatsby Site</h1>
		<ul>
			<li>
				<Link to="/blog/">Blog</Link>
			</li>
			<li>
				<Link to="/image/">Images</Link>
			</li>
			<li>
				<Link to="/jokes/">Jokes</Link>
			</li>
			<li>
				<Link to="/strava/">Strava</Link>
			</li>
		</ul>
	</Layout>
)

export default IndexPage
