const checkFilter = (array, checked) => {
	const checkedOther = array.every(({ label, check }) => {
		if (label === 'all') return true
		return check
	})
	if (!checked) {
		if (checkedOther) {
			return array.map((filter) => ({ ...filter, check: checkedOther }))
		}
	}
	if (checked) {
		if (!checkedOther) {
			return array.map((filter) => {
				if (filter.label === 'all') return { ...filter, check: checkedOther }
				return filter
			})
		}
	}
	return array
}

const sortPriceTickets = (array) => {
	return array.slice().sort((prevTicket, nextTicket) => prevTicket.price - nextTicket.price)
}

const sortFastTimeTickets = (array) => {
	return array.slice().sort((prevTicket, nextTicket) => {
		const { duration: prevDuration1 } = prevTicket.segments[0]
		const { duration: prevDuration2 } = prevTicket.segments[1]
		const { duration: nextDuration1 } = nextTicket.segments[0]
		const { duration: nextDuration2 } = nextTicket.segments[1]
		return prevDuration1 + prevDuration2 - nextDuration1 - nextDuration2
	})
}

const sortPriceOrTimeTickets = (array, type) => {
	if (type === 'price') {
		return sortPriceTickets(array)
	}
	if (type === 'duration') {
		return sortFastTimeTickets(array)
	}
}

export { checkFilter, sortPriceOrTimeTickets }
