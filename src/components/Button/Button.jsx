import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
	return (
		<button
			className="loadmore__button"
			type="button"
			onClick={() => onClick()}
		>
			Load more
		</button>
	);
};

Button.propTypes = {
	onClick: PropTypes.func.isRequired,
};
