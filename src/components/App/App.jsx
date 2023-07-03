import React, { Component } from 'react';
import { Searchbar } from 'components/Searchbar';
import { Loader } from 'components/Loader';
import { fetchPicts, apiOptions, handleLoadMoreBtn } from 'services';
import { ImageGallery } from 'components/ImageGallery';
import { ImageGalleryItem } from 'components/ImageGallery';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';

export class App extends Component {
	state = {
		query: '',
		isLoading: false,
		startPage: 1,
		pictsPerPage: apiOptions.per_page,
		picts: [],
		totalPicts: 0,
		showLoadMore: false,
		noResult: false,
		modalIsOpen: false,
		modalImgSrc: null,
		modalImgTags: null,
	};

	async componentDidUpdate(_, prevState) {
		if (
			prevState.query !== this.state.query ||
			prevState.startPage !== this.state.startPage
		) {
			try {
				this.setState({ isLoading: true });

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
				this.setState({ isLoading: false });

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

	onClickMore = () => {
		this.setState({ startPage: this.state.startPage + 1 });
	};

	handleScroll = () => {
		window.scroll(0, 0);
	};

	onClickPict = (imgSrc, imgTags) => {
		window.addEventListener('scroll', this.handleScroll);

		this.setState({
			modalIsOpen: true,
			modalImgSrc: imgSrc,
			modalImgTags: imgTags,
		});

		const handleEsc = e => {
			if (e.code === 'Escape') {
				this.setState({ modalIsOpen: false });
				window.removeEventListener('keydown', handleEsc);
				window.removeEventListener('scroll', this.handleScroll);
			}
		};

		window.addEventListener('keydown', handleEsc);
	};

	onClickModal = () => {
		window.removeEventListener('scroll', this.handleScroll);
		this.setState({ modalIsOpen: false });
	};

	render() {
		return (
			<div className="app">
				<Searchbar onSubmit={this.onSubmit} />
				{this.state.isLoading && <Loader />}

				{this.state.noResult && this.state.picts.length === 0 && (
					<p>There are no images according to your query</p>
				)}

				<ImageGallery children={ImageGalleryItem}>
					<ImageGalleryItem
						picts={this.state.picts}
						onClick={this.onClickPict}
					/>
				</ImageGallery>

				{this.state.modalIsOpen && (
					<Modal
						imgSrc={this.state.modalImgSrc}
						imgTags={this.state.modalImgTags}
						onClick={this.onClickModal}
					/>
				)}

				{this.state.showLoadMore && <Button onClick={this.onClickMore} />}
			</div>
		);
	}
}
