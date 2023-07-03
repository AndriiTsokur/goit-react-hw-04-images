import React from 'react';
import PropTypes from 'prop-types';

export function ImageGallery({ children }) {
	return <ul className="gallery">{children}</ul>;
}

ImageGallery.propTypes = {
	children: PropTypes.element.isRequired,
};
