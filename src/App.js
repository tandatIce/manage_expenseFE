import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';

import { publicRoutes, privateRoutes, authenticationRoutes } from './routes';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Layout = route.layout == null ? Fragment : route.layout;

                        const Page = route.element;
                        return (
                            <Route
                                exact
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    {privateRoutes.map((route, index) => {
                        const Layout = route.layout == null ? Fragment : route.layout;

                        const Page = route.element;
                        return (
                            <Route
                                exact
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    {authenticationRoutes.map((route, index) => {
                        const Layout = route.layout == null ? Fragment : route.layout;

                        const Page = route.element;
                        return (
                            <Route
                                exact
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
