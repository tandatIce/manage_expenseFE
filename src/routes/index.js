import { DefautLayout } from '@/layout';
import config from '@/config';
import Home from '@/pages/OtherPage/User/Home';

const routes = config.routes;

const publicRoutes = [{ path: routes.HOME, element: Home, layout: DefautLayout }];

const privateRoutes = [];

const authenticationRoutes = [];

export { publicRoutes, privateRoutes, authenticationRoutes };
