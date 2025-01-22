import React from 'react';
import cx from 'classnames';

import Header from '../Header';

const DefaultLayout = ({ children }) => {
    return (
        <div>
            <Header />
            {/* <HeaderMobile /> */}
            <div className={cx('mx-8 pt-16', 'max-sm:mx-0')}> {children}</div>
        </div>
    );
};

export default DefaultLayout;
