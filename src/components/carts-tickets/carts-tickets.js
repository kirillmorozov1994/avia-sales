import React, { useEffect, useCallback, createRef } from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import FilterPrice from '../filter-price'
import CartTicket from '../cart-ticket'
import Spinner from '../spinner'
import ErrorBoundry from '../error-boundry'

const CartsTickets = inject(
	({
		store: {
			loading,
			error,
			requestInitialData,
			requestNextData,
			visibleTickets,
			hasMore,
			setPage,
			page,
		},
	}) => ({
		loading,
		error,
		requestInitialData,
		requestNextData,
		visibleTickets,
		hasMore,
		setPage,
		page,
	})
)(
	observer(
		({
			loading,
			error,
			requestInitialData,
			requestNextData,
			visibleTickets,
			hasMore,
			setPage,
			page,
		}) => {
			useEffect(() => {
				requestInitialData()
			}, [])
			const observerCart = createRef()
			const lastCartTicket = useCallback(
				(node) => {
					if (observerCart.current) observerCart.current.disconnect()
					observerCart.current = new IntersectionObserver((entries) => {
						if (entries[0].isIntersecting && hasMore) {
							setPage()
						}
					})
					if (node) observerCart.current.observe(node)
				},
				[hasMore, page]
			)
			return (
				<div className="main-carts">
					<div className="main-carts__filter">
						<FilterPrice />
					</div>
					<div className="main-carts__tickets">
						{loading ? null : error ? null : visibleTickets.length === 0 ? (
							<div className="error-boundry">Авиабилеты не найдены</div>
						) : (
							visibleTickets.map((item, i) => {
								if (visibleTickets.length === i + 1) {
									return <CartTicket ref={lastCartTicket} key={i} ticket={item} />
								} else {
									return <CartTicket key={i} ticket={item} />
								}
							})
						)}
						{loading ? <Spinner /> : null}
						{error && <ErrorBoundry reconnect={requestNextData} />}
					</div>
				</div>
			)
		}
	)
)

CartsTickets.defaultProps = {
	visibleTickets: [],
	loading: true,
	error: null,
	hasMore: false,
	page: 1,
}

CartsTickets.propTypes = {
	loading: PropTypes.bool,
	error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	hasMore: PropTypes.bool,
	page: PropTypes.number,
	visibleTickets: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
}

CartsTickets.wrappedComponent.propTypes = {
	requestInitialData: PropTypes.func.isRequired,
	requestNextData: PropTypes.func.isRequired,
}

export default CartsTickets
