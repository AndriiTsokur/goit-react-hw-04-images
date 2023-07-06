import { useEffect } from 'react';
import PropTypes from 'prop-types';

export const Modal = ({ imgSrc, imgTags, onCloseModal }) => {
	useEffect(() => {
		const handleKeyDown = e => {
			if (e.code === 'Escape') onCloseModal();
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [onCloseModal]);

	return (
		<div className="overlay" onClick={onCloseModal}>
			<img className="modal" src={imgSrc} alt={imgTags} />
		</div>
	);
};

Modal.propTypes = {
	imgSrc: PropTypes.string.isRequired,
	imgTags: PropTypes.string.isRequired,
	onCloseModal: PropTypes.func.isRequired,
};
