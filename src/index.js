import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App';
import { createStore,Provider } from 'react-redux';
import { ConnectedRouter } from "react-router-redux";
import { Route, Switch } from 'react-router-dom';
import {store,history} from './store';

import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <Route path="/" component={App} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
