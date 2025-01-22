import { DefautLayout } from '@/layout';
import config from '@/config';

import Home from '@/pages/User/Home';
import Login from '@/pages/Auth/Login';
import Signup from '@/pages/Auth/Signup';
import ManageInGroup from '@/pages/User/ManageInGroup';

const routes = config.routes;

const publicRoutes = [];

const privateRoutes = [
    { path: routes.HOME, element: Home, layout: DefautLayout },
    { path: routes.MANAGE, element: ManageInGroup, layout: DefautLayout },
];

const authenticationRoutes = [
    { path: routes.auth.LOGIN, element: Login, layout: null },
    { path: routes.auth.SIGNUP, element: Signup, layout: null },
];

export { publicRoutes, privateRoutes, authenticationRoutes };
