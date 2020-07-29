import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'

const FilterPrice = inject(({ store: { isFastOrCheap, setChangeFilterPrice } }) => ({
	isFastOrCheap,
	setChangeFilterPrice,
}))(
	observer(({ isFastOrCheap, setChangeFilterPrice }) => {
		const changeFilterPrice = (e) => {
			if (!e.currentTarget.classList.contains('active')) {
				setChangeFilterPrice()
			}
		}
		return (
			<div className="filter-price">
				<button
					className={`filter-price__item ${isFastOrCheap ? 'active' : ''}`}
					onClick={changeFilterPrice}
				>
					Самый дешевый
				</button>
				<button
					className={`filter-price__item ${!isFastOrCheap ? 'active' : ''}`}
					onClick={changeFilterPrice}
				>
					Самый быстрый
				</button>
			</div>
		)
	})
)

FilterPrice.defaultProps = {
	isFastOrCheap: true,
}

FilterPrice.propTypes = {
	isFastOrCheap: PropTypes.bool,
}

FilterPrice.wrappedComponent.propTypes = {
	setChangeFilterPrice: PropTypes.func.isRequired,
}

export default FilterPrice
