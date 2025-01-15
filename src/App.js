import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Fragment } from 'react';

import { publicRoutes, privateRoutes, authenticationRoutes } from './routes';
import RequiredLogin from './pages/OtherPage/RequiredLogin';
import NotAccess from './pages/OtherPage/NotAccess';

function App() {
    const [cookies] = useCookies(['token']);

    const token = cookies.token;

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

                        const Page = token ? route.element : RequiredLogin;
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

                        const Page = token ? NotAccess : route.element;
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
