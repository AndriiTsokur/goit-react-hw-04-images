export function handleLoadMoreBtn(
	pictsPerPage,
	renderedPictsQty,
	totalPictsQty
) {
	return (
		totalPictsQty > pictsPerPage &&
		totalPictsQty - renderedPictsQty > pictsPerPage
	);
}
