/* eslint-disable react/jsx-filename-extension */
import '@babel/polyfill'; // eslint-disable-line import/no-extraneous-dependencies

import React from 'react';
import ReactDOM from 'react-dom';
import {
  AppProvider,
  AuthenticatedPageRoute,
  ErrorPage,
  PageRoute,
} from '@edx/frontend-platform/react';
import { APP_INIT_ERROR, APP_READY, initialize } from '@edx/frontend-platform';
import { subscribe } from '@edx/frontend-platform/pubSub';
import Header from '@edx/frontend-component-header-edx';
import Footer from '@edx/frontend-component-footer-edx';
import ProgramDashboard from './components/ProgramDashboard';
import './base.scss';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider>
      <Header />
      <AuthenticatedPageRoute exact path="/" component={ProgramDashboard} />
      <PageRoute
        exact
        path="/error_example"
        component={() => <ErrorPage message="Test error message" />}
      />
      <Footer />
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  messages: [],
  requireAuthenticatedUser: false,
  hydrateAuthenticatedUser: true,
});
