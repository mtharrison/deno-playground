import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'

import App from './components/app'
import { store } from './state'


const renderApplication = () => render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root")
);

store.subscribe(() => renderApplication());

renderApplication();
