import React from 'react'
import PropTypes from 'prop-types'

const FilterTransferItem = ({ label, field, check, changeFilterTransfer }) => {
	const hadleInputChange = (e) => {
		e.preventDefault()
		changeFilterTransfer(e.target.previousElementSibling.name)
	}
	return (
		<li className="filter-item">
			<input
				type="checkbox"
				className="filter-item__input"
				name={label}
				id={label}
				checked={check}
				readOnly
			/>
			<label htmlFor={label} className="filter-item__label" onMouseDown={hadleInputChange}>
				{field}
			</label>
		</li>
	)
}

FilterTransferItem.defaultProps = {
	label: 'stops',
	field: 'Пересадки',
	check: false,
}

FilterTransferItem.propTypes = {
	label: PropTypes.string,
	field: PropTypes.string,
	check: PropTypes.bool,
	changeFilterTransfer: PropTypes.func.isRequired,
}

export default FilterTransferItem
