//Check if undefined, null, empty

export const gutenaEcosysOnboardIsEmpty = ( data ) => {
	return 'undefined' === typeof data || null === data || '' == data;
};
