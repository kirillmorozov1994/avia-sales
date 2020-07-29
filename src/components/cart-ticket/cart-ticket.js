import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import CartTicketItem from '../cart-ticket-item'
import 'react-lazy-load-image-component/src/effects/opacity.css'

const CartTicket = forwardRef(({ ticket }, ref) => {
	const ticketCartsItems = ticket.segments.map((segment, i) => (
		<CartTicketItem key={i} segment={segment} />
	))

	return (
		<div className="cart-ticket" ref={ref}>
			<div className="cart-ticket__title">
				<div className="price">{ticket.price.toLocaleString('ru-RU')} Р</div>
				<div className="img">
					<LazyLoadImage
						alt={'img-avialines'}
						effect="opacity"
						src={`http://pics.avs.io/99/36/${ticket.carrier}.png`}
					/>
				</div>
			</div>
			<div className="cart-ticket__info">{ticketCartsItems}</div>
		</div>
	)
})

CartTicket.propTypes = {
	ticket: PropTypes.shape({
		segments: PropTypes.arrayOf(PropTypes.object).isRequired,
		price: PropTypes.number.isRequired,
		carrier: PropTypes.string.isRequired,
	}),
}

export default CartTicket
