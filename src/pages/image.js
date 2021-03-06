import React from 'react'

import Layout from '../components/layout'
import ImageBlock from '../components/imageBlock'

class ImagePage extends React.Component {
	constructor(props) {
		super(props)
		this.state = { isToggleOn: true }
	}

	handleClick = () => {
		// console.log('have been clicked', this)

		this.setState(state => ({
			isToggleOn: !state.isToggleOn,
		}))
	}

	render() {
		return (
			<Layout>
				<div onClick={this.handleClick}>
					<h1>Hi from the Image page</h1>
					<ImageBlock
						images={30}
						isRotated={this.state.isToggleOn}
						onClick={this.handleClickz}
						height={250}
					/>
				</div>
			</Layout>
		)
	}
}

export default ImagePage
