import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
	state = {
		inputValue: '',
	};

	handleInput = e => {
		this.setState({ inputValue: e.target.value.trim() });
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.onSubmit(this.state.inputValue);
		// this.setState({ inputValue: '' });
	};

	render() {
		return (
			<header className="searchbar">
				<form className="form" onSubmit={this.handleSubmit}>
					<button type="submit" className="button">
						<span className="button-label">Search</span>
					</button>

					<input
						onChange={this.handleInput}
						value={this.state.inputValue}
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
	}
}

Searchbar.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};
