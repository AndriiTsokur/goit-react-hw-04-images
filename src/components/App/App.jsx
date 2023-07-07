import { useEffect, useState } from 'react';
import { Searchbar } from 'components/Searchbar';
import { Loader } from 'components/Loader';
import { fetchPicts, apiOptions, handleLoadMoreBtn } from 'services';
import { ImageGallery } from 'components/ImageGallery';
import { ImageGalleryItem } from 'components/ImageGallery';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';

export const App = () => {
	const [query, setQuery] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [startPage, setStartPage] = useState(1);
	const [picts, setPicts] = useState([]);
	// const [totalPicts, setTotalPicts] = useState(0);
	const [showLoadMore, setShowLoadMore] = useState(false);
	const [noResult, setNoResult] = useState(false);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalImgSrc, setModalImgSrc] = useState(null);
	const [modalImgTags, setModalImgTags] = useState(null);
	const [btnClick, setBtnClick] = useState(false);

	const pictsPerPage = apiOptions.per_page;

	useEffect(() => {
		if (!query) return;

		const fetchPictsData = async () => {
			try {
				setIsLoading(true);
				const pictsData = await fetchPicts(query, startPage);

				if (pictsData.hits.length === 0) {
					setNoResult(true);
					return;
				}

				setPicts([...picts, ...pictsData.hits]);
				// setTotalPicts(pictsData.totalHits);
				setShowLoadMore(
					handleLoadMoreBtn(pictsPerPage, picts.length, pictsData.totalHits)
				);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};

		if (btnClick) {
			fetchPictsData();
			setBtnClick(false);
		}
	}, [query, startPage, picts, pictsPerPage, btnClick, isLoading]);

	const onSubmit = searchValue => {
		setQuery(searchValue);
		setStartPage(1);
		setPicts([]);
		setShowLoadMore(false);
		setBtnClick(true);
		setNoResult(false);
	};

	const onClickMore = () => {
		setBtnClick(true);
		setStartPage(startPage + 1);
	};

	const onClickPict = (imgSrc, imgTags) => {
		onOpenModal();
		setModalImgSrc(imgSrc);
		setModalImgTags(imgTags);
	};

	const onOpenModal = () => {
		setModalIsOpen(true);
		setIsLoading(true);
	};
	const onCloseModal = () => setModalIsOpen(false);
	const onModalLoad = () => setIsLoading(false);

	return (
		<div className="app">
			<Searchbar onSubmit={onSubmit} />

			{noResult && picts.length === 0 && (
				<p>There are no images according to your query</p>
			)}

			<ImageGallery children={ImageGalleryItem}>
				<ImageGalleryItem picts={picts} onClick={onClickPict} />
			</ImageGallery>

			{showLoadMore && <Button onClick={onClickMore} />}

			{modalIsOpen && (
				<Modal
					imgSrc={modalImgSrc}
					imgTags={modalImgTags}
					onCloseModal={onCloseModal}
					onModalLoad={onModalLoad}
				/>
			)}

			{isLoading && <Loader />}
		</div>
	);
};
