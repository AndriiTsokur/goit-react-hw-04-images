import { useState } from 'react';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
	const [inputValue, setInputValue] = useState('');

	const handleInput = e => {
		setInputValue(e.target.value.trim());
	};

	const handleSubmit = e => {
		e.preventDefault();
		onSubmit(inputValue);
	};

	return (
		<header className="searchbar">
			<form className="form" onSubmit={handleSubmit}>
				<button type="submit" className="button">
					<span className="button-label">Search</span>
				</button>

				<input
					onChange={handleInput}
					value={inputValue}
					className="input"
					type="text"
					autoComplete="off"
					autoFocus
					placeholder="Search images and photos"
					required
				/>
			</form>
		</header>
	);
};

Searchbar.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};
