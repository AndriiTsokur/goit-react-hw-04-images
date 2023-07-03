import React, { Component } from 'react';
import { Searchbar } from 'components/Searchbar';
import { fetchPicts, apiOptions, handleLoadMoreBtn } from 'services';
import { ImageGallery } from 'components/ImageGallery';
import { ImageGalleryItem } from 'components/ImageGallery';
import { Button } from 'components/Button';

export class App extends Component {
	state = {
		query: '',
		startPage: 1,
		pictsPerPage: apiOptions.per_page,
		picts: [],
		totalPicts: 0,
		showLoadMore: false,
		noResult: false,
	};

	async componentDidUpdate(_, prevState) {
		if (
			prevState.query !== this.state.query ||
			prevState.startPage !== this.state.startPage
		) {
			try {
				const pictsData = await fetchPicts(
					this.state.query,
					this.state.startPage
				);

				this.setState({
					picts: [...this.state.picts, ...pictsData.hits],
					totalPicts: pictsData.totalHits,
					showLoadMore: handleLoadMoreBtn(
						this.state.pictsPerPage,
						this.state.picts.length,
						pictsData.totalHits
					),
				});
			} catch (error) {
				console.log(error);
			} finally {
				if (this.state.picts.length === 0) {
					this.setState({ noResult: true });
				}
			}
		}
	}

	onSubmit = searchValue => {
		this.setState({
			query: searchValue,
			startPage: 1,
			picts: [],
			showLoadMore: false,
			noResult: false,
		});
	};

	onClick = () => {
		this.setState({ startPage: this.state.startPage + 1 });
	};

	render() {
		return (
			<div className="app">
				<Searchbar onSubmit={this.onSubmit} />
				{this.state.noResult && this.state.picts.length === 0 && (
					<p>There are no images according to your query</p>
				)}
				<ImageGallery children={ImageGalleryItem}>
					<ImageGalleryItem picts={this.state.picts} />
				</ImageGallery>
				{this.state.showLoadMore && <Button onClick={this.onClick} />}
			</div>
		);
	}
}
