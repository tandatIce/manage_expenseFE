import { DefautLayout } from '@/layout';
import config from '@/config';

import Home from '@/pages/User/Home';
import Login from '@/pages/Auth/Login';
import Signup from '@/pages/Auth/Signup';

const routes = config.routes;

const publicRoutes = [{ path: routes.HOME, element: Home, layout: DefautLayout }];

const privateRoutes = [];

const authenticationRoutes = [
    { path: routes.auth.LOGIN, element: Login, layout: DefautLayout },
    { path: routes.auth.SIGNUP, element: Signup, layout: DefautLayout },
];

export { publicRoutes, privateRoutes, authenticationRoutes };
