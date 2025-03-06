import React from 'react';
import cx from 'classnames';

import Header from '../Header';
import DebtReminderModal from './DebtReminderModal';

const DefaultLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <DebtReminderModal />
            <div className={cx('mx-8 pt-16', 'max-sm:mx-0')}> {children}</div>
        </div>
    );
};

export default DefaultLayout;
