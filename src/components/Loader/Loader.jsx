import React from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';

export const Loader = () => {
	return (
		<MagnifyingGlass
			visible={true}
			height="80"
			width="80"
			ariaLabel="MagnifyingGlass-loading"
			wrapperStyle={{ alignSelf: 'center', justifySelf: 'center' }}
			wrapperClass="MagnifyingGlass-wrapper"
			glassColor="#c0efff"
			color="#3f51b5"
		/>
	);
};
