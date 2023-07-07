import { useEffect } from 'react';
import PropTypes from 'prop-types';

export const Modal = ({ imgSrc, imgTags, onCloseModal, onModalLoad }) => {
	const currentScroll = window.scrollY;

	useEffect(() => {
		const handleKeyDown = e => {
			if (e.code === 'Escape') onCloseModal();
		};

		const handleScroll = () => {
			window.scroll(0, currentScroll);
		};

		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('scroll', handleScroll);
		};
	}, [onCloseModal, currentScroll]);

	return (
		<div className="overlay" onClick={onCloseModal}>
			<img onLoad={onModalLoad} className="modal" src={imgSrc} alt={imgTags} />
		</div>
	);
};

Modal.propTypes = {
	imgSrc: PropTypes.string.isRequired,
	imgTags: PropTypes.string.isRequired,
	onCloseModal: PropTypes.func.isRequired,
	onModalLoad: PropTypes.func.isRequired,
};
