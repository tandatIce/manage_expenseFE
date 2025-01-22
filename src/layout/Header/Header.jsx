import React from 'react';
import cx from 'classnames';
import { useEffect, useState, useRef } from 'react';
import { useCookies } from 'react-cookie';
// import { IoMdMenu } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button';
import { routes } from '@/config';

const Header = () => {
    const [isMenu, setIsMenu] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [infoUser, setInfoUser] = useState({});
    const ref = useRef(null);

    const [cookies, , removeCookie] = useCookies(['token', 'infoUser']);

    const navigate = useNavigate();

    // const handleClickMenu = () => {
    //     setIsMenu(!isMenu);
    // };

    const navigateLogin = () => {
        navigate(routes.auth.LOGIN);
    };

    const handleLogout = () => {
        removeCookie('token', { path: '/' });
        removeCookie('infoUser', { path: '/' });
        navigate(routes.auth.LOGIN);
    };

    useEffect(() => {
        if (cookies?.token) {
            setIsUser(true);
            setInfoUser(cookies.infoUser);
        } else {
            setIsUser(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cookies.token]);

    //add event hide menu when click outside menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target) && isMenu === true) {
                setIsMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMenu]);

    return (
        <header
            className={cx(
                '!fixed left-0 z-20 h-[64px] w-full bg-white px-[15px] py-[17px] shadow-lg',
                'relative flex items-center justify-end',
            )}
        >
            {/* <button onClick={handleClickMenu} className={cx('xl:hidden', isMenu && 'invisible')}>
                <IoMdMenu size={20} />
            </button> */}
            {/* Menu */}
            {/* <div
                className={cx(
                    'top-[64px] max-xl:absolute max-xl:left-[-400px] max-xl:h-screen max-xl:pt-4 max-xl:shadow-lg',
                    'bg-white transition-all duration-300',
                    isMenu && '!left-0',
                )}
                ref={ref}
            >
                <ul
                    className={cx(
                        'font-lexend flex flex-none cursor-pointer bg-white font-medium xl:gap-6',
                        'max-xl:flex-col max-xl:py-4',
                        'max-xl:gap-2',
                    )}
                >
                    {listMenu.map((value, index) => (
                        <li key={index} className={cx('group', 'relative', 'max-xl:w-full max-xl:min-w-[300px]')}>
                            <div className={cx('items-center max-xl:flex max-xl:justify-between max-xl:px-4')}>
                                <Link href={value.url} onClick={CloseMenuHeader}>
                                    <div className={cx('group-hover:text-primary font-semibold')}>
                                        {value.title.toUpperCase()}
                                    </div>
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div> */}
            <div className={cx('mr-4 font-medium italic text-pink-400')}>{infoUser?.username}</div>
            {!isUser && <Button onClick={navigateLogin}>Đăng nhập</Button>}
            {isUser && <Button onClick={handleLogout}>Đăng xuất</Button>}
        </header>
    );
};

export default Header;
