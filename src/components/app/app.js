import React from 'react'
import Header from '../header'
import FilterTransfer from '../filter-transfer'
import CartsTickets from '../carts-tickets'

const App = () => {
	return (
		<div className="app">
			<Header />
			<div className="app-main">
				<FilterTransfer />
				<CartsTickets />
			</div>
		</div>
	)
}

export default App
