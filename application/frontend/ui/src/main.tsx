import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'

import App from './components/app'
import { store } from './state'
import { updateExamples, updateVersions, Example } from './actions'

// Bootstrap the application

const renderApplication = () => render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root")
);

store.subscribe(() => renderApplication());

renderApplication();

// Load examples

const loadExamples = async () => {

    const res = await fetch('/examples/examples.json');
    const base = await res.json();

    const resolve: Promise<Array<Example>> = Promise.all(base.map(async (example: Example) => {

        const res = await fetch(`/examples/${example.file}`);
        example.body = await res.text();
        return example;
    }));

    const examples = await resolve;
    store.dispatch(updateExamples(examples));
};

loadExamples();

// Load version

const loadVersions = async () => {

    const res = await fetch('/versions');
    const versions = await res.json();
    console.log(versions);
    store.dispatch(updateVersions(versions));
};

loadVersions();
