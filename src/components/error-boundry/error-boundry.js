import React from 'react'
import PropTypes from 'prop-types'

const ErrorBoundry = ({ reconnect }) => {
	return (
		<div className="error-boundry">
			<div className="error-boundry__title">Ошибка загрузки данных</div>
			<button className="filter-price__item" onClick={() => reconnect()}>
				Попробовать снова
			</button>
		</div>
	)
}

ErrorBoundry.propTypes = {
	reconnect: PropTypes.func.isRequire,
}

export default ErrorBoundry
