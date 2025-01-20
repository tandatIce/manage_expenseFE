import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import { listMenu } from '@/config/constant';

const HeaderMobile = () => {
    return (
        <div className={cx('bg-color-white shadow-custom fixed bottom-0 z-10 h-[48px] w-full px-[15px]', 'md:hidden')}>
            <div className={cx('flex h-full')}>
                {listMenu.map((value, index) => {
                    const Icon = value.icon;

                    return (
                        <Link
                            key={index}
                            href={value.url}
                            className={cx('text-primary flex flex-1 flex-col items-center justify-center gap-1')}
                        >
                            <Icon size={20} />
                            <div className={cx('text-[12px]')}>{value.title}</div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default HeaderMobile;
