import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import store from './store'
import Spinner from './components/spinner'
import './index.scss'

const App = lazy(() => import('./components/app'))

ReactDOM.render(
	<Provider store={store}>
		<Suspense fallback={<Spinner />}>
			<App />
		</Suspense>
	</Provider>,
	document.getElementById('root')
)
