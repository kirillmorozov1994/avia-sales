import React from 'react'
import PropTypes from 'prop-types'
import FilterTransferItem from '../filter-transfer-item'
import { observer, inject } from 'mobx-react'

const FilterTransfer = inject(({ store: { filterTransfer, setChangeFilterTransfer } }) => ({
	filterTransfer,
	setChangeFilterTransfer,
}))(
	observer(({ filterTransfer, setChangeFilterTransfer }) => {
		const filterList = filterTransfer.map((filter) => (
			<FilterTransferItem
				key={filter.label}
				{...filter}
				changeFilterTransfer={setChangeFilterTransfer}
			/>
		))
		return (
			<div className="filter-transfer">
				<div className="filter-transfer__title">Количество пересадок</div>
				<ul className="filter-transfer__list">{filterList}</ul>
			</div>
		)
	})
)

FilterTransfer.wrappedComponent.propTypes = {
	filterTransfer: PropTypes.array.isRequired,
	setChangeFilterTransfer: PropTypes.func.isRequired,
}

export default FilterTransfer
