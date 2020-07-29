import { decorate, observable, action, configure, computed } from 'mobx'
import 'mobx-react-lite/batchingForReactDom'
import { initialState } from './initial-state'
import { checkFilter, sortPriceOrTimeTickets } from './utils-func'
configure({ enforceActions: 'observed' })

class Store {
	filterTransfer = initialState.filterTransfer
	loading = initialState.loading
	error = initialState.error
	searchId = initialState.searchId
	tickets = initialState.tickets
	isFastOrCheap = initialState.isFastOrCheap
	perPage = initialState.perPage
	page = initialState.page
	totalTickets = initialState.totalTickets

	setChangeFilterTransfer = (name) => {
		if (name === 'all') {
			const checkedAll = !this.filterTransfer.find(({ label }) => label === name).check
			this.filterTransfer.forEach((filter) => {
				filter.check = checkedAll
			})
		} else {
			this.filterTransfer.forEach((filter) => {
				if (filter.label === name) filter.check = !filter.check
			})
		}
		this.setSelectedFilterTransfer()
	}

	setSelectedFilterTransfer() {
		const checkedAll = this.filterTransfer[0].check
		if (!checkedAll) {
			this.filterTransfer = checkFilter(this.filterTransfer, checkedAll)
		}
		if (checkedAll) {
			this.filterTransfer = checkFilter(this.filterTransfer, checkedAll)
		}
	}

	setChangeFilterPrice = () => {
		this.isFastOrCheap = !this.isFastOrCheap
	}

	setSearchId = (id) => {
		this.searchId = id
	}

	setTickets = (tickets) => {
		if (!this.tickets || this.tickets.length === 0) {
			this.tickets = tickets
		} else {
			this.tickets = [...this.tickets, ...tickets]
		}
	}

	setClearState = () => {
		this.tickets = []
	}

	setChangeLoading = (bool) => {
		this.loading = bool
	}

	setChangeError = (error) => {
		this.error = error
	}

	setTotalTickets = (total) => {
		this.totalTickets = total
	}

	setPage = () => {
		this.page = this.page + 1
	}

	get filtersTickets() {
		if (this.tickets) {
			const type = this.isFastOrCheap ? 'price' : 'duration'
			if (this.filterTransfer[0].check) {
				return sortPriceOrTimeTickets(this.tickets, type)
			}
			const checkedTransfer = this.filterTransfer
				.filter(({ label, check }) => {
					if (label === 'all') return false
					return check
				})
				.map(({ stop }) => stop)
			const filterTicketsTransfer = this.tickets.filter(
				({ segments }) =>
					checkedTransfer.includes(segments[0].stops.length) &&
					checkedTransfer.includes(segments[1].stops.length)
			)
			return sortPriceOrTimeTickets(filterTicketsTransfer, type)
		}
		return this.tickets
	}

	get visibleTickets() {
		if (this.filtersTickets) {
			return this.filtersTickets.slice(0, this.perPage * this.page)
		}
		return this.filtersTickets
	}

	get hasMore() {
		if (this.totalTickets) {
			return this.totalTickets > this.perPage * this.page
		}
		return false
	}

	request = async (initial) => {
		try {
			this.setChangeLoading(true)
			this.setChangeError(null)
			if (initial) {
				this.setClearState()
				await this.requestSearchId()
			}
			await this.requestTickets()
			this.setChangeLoading(false)
		} catch (error) {
			this.setChangeLoading(false)
			this.setChangeError(error)
		}
	}

	requestSearchId = async () => {
		const resId = await fetch('https://front-test.beta.aviasales.ru/search')
		if (resId.status !== 200) {
			throw new Error(resId.status)
		}
		const bodyId = await resId.json()
		this.setSearchId(bodyId.searchId)
	}

	requestTickets = async () => {
		const resTickets = await fetch(
			`https://front-test.beta.aviasales.ru/tickets?searchId=${this.searchId}`
		)
		if (resTickets.status !== 200) {
			throw new Error(resTickets.status)
		}
		const bodyTickets = await resTickets.json()
		this.setTickets(bodyTickets.tickets)
		this.setTotalTickets(bodyTickets.tickets.length)
	}

	requestInitialData = async () => {
		this.request(true)
	}

	requestNextData = async () => {
		this.request(false)
	}
}

Store = decorate(Store, {
	filterTransfer: observable,
	loading: observable,
	error: observable,
	searchId: observable,
	tickets: observable,
	isFastOrCheap: observable,
	totalTickets: observable,
	page: observable,
	filtersTickets: computed,
	visibleTickets: computed,
	hasMore: computed,
	setPage: action,
	setChangeFilterTransfer: action,
	setSelectedFilterTransfer: action,
	setChangeFilterPrice: action,
	setTotalTickets: action.bound,
	setSearchId: action.bound,
	setTickets: action.bound,
	setChangeLoading: action.bound,
	setChangeError: action.bound,
	setClearState: action.bound,
})

const store = new Store()

export default store
