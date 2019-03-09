import React from 'react'
import { Link } from 'gatsby'

const Footer = ({ siteTitle, staticFooter }) => {
	let footerStyles = {
		background: 'blue',
		marginTop: '2.45rem',
		width: '100%',
	}

	if ('true' === staticFooter) {
		footerStyles = {
			...footerStyles,
			...{
				position: 'fixed',
				bottom: 0,
				left: 0,
			},
		}
	}

	return (
		<div style={footerStyles}>
			<div
				style={{
					margin: '0 auto',
					maxWidth: 960,
					padding: '2.45rem 1.0875rem',
				}}
			>
				<Link
					to="/"
					style={{
						color: 'white',
						textDecoration: 'none',
					}}
				>
					&copy; {siteTitle} 2019
				</Link>
			</div>
		</div>
	)
}

export default Footer
