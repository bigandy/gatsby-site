import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

const IndexPage = () => (
	<Layout>
		<h1>Hi people</h1>
		<p>Welcome to your new Gatsby site.</p>
		<p>Now go build something great.</p>
		<ul>
			<li>
				<Link to="/page-2/">Go to page 2</Link>
			</li>
			<li>
				<Link to="/blog/">Blog</Link>
			</li>
			<li>
				<Link to="/image/">Images</Link>
			</li>
		</ul>
	</Layout>
)

export default IndexPage
