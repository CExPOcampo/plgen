import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContainer from './AppContainer';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import allReducers from './reducers';
const store = createStore(
	allReducers,
	/* FOR USE WITH REDUX-DEV-TOOLS https://github.com/zalmoxisus/redux-devtools-extension#usage */
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
	<Provider store={store}>
		<AppContainer />
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();
