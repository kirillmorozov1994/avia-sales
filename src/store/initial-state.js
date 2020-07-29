const initialState = {
	filterTransfer: [
		{
			field: 'Все',
			label: 'all',
			check: true,
		},
		{
			field: 'Без бересадок',
			label: 'noStop',
			check: true,
			stop: 0,
		},
		{
			field: '1 бересадка',
			label: 'oneStop',
			check: true,
			stop: 1,
		},
		{
			field: '2 бересадки',
			label: 'twoStop',
			check: true,
			stop: 2,
		},
		{
			field: '3 бересадки',
			label: 'threeStop',
			check: true,
			stop: 3,
		},
	],
	isFastOrCheap: true,
	loading: true,
	error: null,
	searchId: null,
	tickets: null,
	totalTickets: null,
	perPage: 5,
	page: 1,
}

export { initialState }
