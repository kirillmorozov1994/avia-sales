import React from 'react'
import PropTypes from 'prop-types'

const CartTicketItem = ({ segment }) => {
	const validateDate = (date) => {
		if (String(date).length === 1) return '0' + date
		return String(date)
	}

	const { origin, destination, date, duration, stops } = segment
	const hours = Math.floor(duration / 60)
	const minutes = parseInt(duration % 60)
	const countStops = stops.length

	const dateDeparture = new Date(date)
	const startHours = validateDate(dateDeparture.getUTCHours())
	const startMinutes = validateDate(dateDeparture.getUTCMinutes())

	const timeStampEnd = dateDeparture.getTime() + duration * 60 * 1000
	const dateArrival = new Date(timeStampEnd)
	const endHours = validateDate(dateArrival.getUTCHours())
	const endMinutes = validateDate(dateArrival.getUTCMinutes())

	return (
		<div className="cart-ticket-item">
			<div className="cart-ticket-item__time cart-ticket-item-parts">
				<div className="item-up">
					{origin} – {destination}
				</div>
				<div className="item-down">
					{startHours}:{startMinutes} – {endHours}:{endMinutes}
				</div>
			</div>
			<div className="cart-ticket-item__hours cart-ticket-item-parts">
				<div className="item-up">В пути</div>
				<div className="item-down">
					{hours}ч {minutes}м
				</div>
			</div>
			<div className="cart-ticket-item__stops cart-ticket-item-parts">
				<div className="item-up">
					{countStops !== 0 ? `${countStops} ` : null}
					{countStops === 0
						? 'Без пересадок'
						: countStops === 1
						? 'пересадка'
						: countStops > 4
						? 'пересадок'
						: 'пересадки'}
				</div>
				<div className="item-down">{stops.join(', ')}</div>
			</div>
		</div>
	)
}

CartTicketItem.propTypes = {
	segment: PropTypes.shape({
		origin: PropTypes.string.isRequired,
		destination: PropTypes.string.isRequired,
		date: PropTypes.string.isRequired,
		duration: PropTypes.number.isRequired,
		stops: PropTypes.array.isRequired,
	}),
}

export default CartTicketItem
