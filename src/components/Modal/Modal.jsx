import React from 'react';
import PropTypes from 'prop-types';

export function Modal({ imgSrc, imgTags, onClick }) {
	return (
		<div className="overlay" onClick={() => onClick()}>
			<img className="modal" src={imgSrc} alt={imgTags} />
		</div>
	);
}

Modal.propTypes = {
	imgSrc: PropTypes.string.isRequired,
	imgTags: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};
