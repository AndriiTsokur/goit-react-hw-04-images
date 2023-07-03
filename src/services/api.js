import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';
export const apiOptions = {
	key: '36292494-f78d44a3f0f4a5930d1d79262',
	q: '',
	image_type: 'photo',
	orientation: 'horizontal',
	page: 1,
	per_page: 12,
};

export const fetchPicts = async (query, startPage) => {
	apiOptions.q = query;
	apiOptions.page = startPage;

	const { data } = await axios.get(API_URL, { params: apiOptions });
	return data;
};
