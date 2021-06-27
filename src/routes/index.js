import React, { lazy, Suspense } from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';
const Container = lazy(() => import('../components/shared/Container/'));
const Account = lazy(() => import('../components/pages/Account/'));
const Home = lazy(() => import('../components/pages/Home/HomeContainer'));
const Products = lazy(() =>
    import('../components/pages/ProductListing/ProductListing')
);
const ProductDetailed = lazy(() =>
    import('../components/pages/ProductDetail/ProductDetail')
);

const MainView = (props) => {
    return (
        <Container>
            <Route
                exact
                path="/"
                component={Home}
                render={() => <Redirect to="/" />}
            />
            <Route exact path="/account" component={Account} />
            <Route
                exact
                path="/products/:id?"
                render={({ match }) =>
                    match.params.id ? <ProductDetailed /> : <Products />
                }
            />
        </Container>
    );
};

export default function Routes(props) {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <div>
                    <Switch>
                        <MainView />
                    </Switch>
                </div>
            </Suspense>
        </Router>
    );
}
