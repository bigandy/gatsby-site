import React from 'react'
import * as PropTypes from 'prop-types'

import imageBlockStyle from './imageBlockStyle.module.css'

class ImageBlock extends React.Component {
	static propTypes = {
		images: PropTypes.number.isRequired,
		isRotated: PropTypes.bool.isRequired,
		height: PropTypes.number,
		width: PropTypes.number
	}

	render() {
		const images = this.props.images
		const isRotated = this.props.isRotated
		const height = this.props.height ? this.props.height : null
		const width = this.props.width ? this.props.width : null

		const altImagesMarkup = Array.apply(null, {
			length: images,
		}).map((e, i) => {
			var angle = (i * 360) / images;
			var style = {
				transform: `rotate(${angle}deg)`,
				position: 'absolute',
			}

			return (
				<img
					src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d4147a2e4e3f79299e2f0c92b13db9ee&auto=format&fit=crop&w=934&q=80"
					key={i}
					alt="a forest"
					style={isRotated ? style : {}}
					height={height}
					width={width}
				/>
			)
		})

		return (
			<div className={imageBlockStyle.container}>
				<p>There are {images} images</p>
				{altImagesMarkup}
			</div>
		)
	}
}

export default ImageBlock
