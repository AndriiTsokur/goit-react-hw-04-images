import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

export const ImageGallery = ({ children }) => {
	const imgListRef = useRef();

	const handleScroll = ref => {
		ref.scrollIntoView({
			block: 'end',
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		handleScroll(imgListRef.current);
	});

	return (
		<ul ref={imgListRef} className="gallery">
			{children}
		</ul>
	);
};

ImageGallery.propTypes = {
	children: PropTypes.element.isRequired,
};
