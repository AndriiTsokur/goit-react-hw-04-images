import React from 'react';
import PropTypes from 'prop-types';

export function ImageGalleryItem({ picts }) {
	return picts.map(picture => {
		return (
			<li key={picture.id} className="gallery-item">
				<img src={picture.webformatURL} alt={picture.tags} />
			</li>
		);
	});
}

ImageGalleryItem.propTypes = {
	picts: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			webformatURL: PropTypes.string.isRequired,
			largeImageURL: PropTypes.string.isRequired,
			tags: PropTypes.string.isRequired,
		}).isRequired
	).isRequired,
};
