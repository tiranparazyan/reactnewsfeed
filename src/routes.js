import React from 'react';
import { Route, IndexRoute, Link } from 'react-router';

import App from './components/app';
import NewsContent from './containers/news-content';
import NewsList from './containers/news-list';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={NewsList} />
        <Route path="*" component={NewsContent} />
    </Route>

)