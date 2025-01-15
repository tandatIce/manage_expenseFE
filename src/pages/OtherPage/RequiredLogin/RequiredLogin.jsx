import cx from 'classnames';

function RequiredLogin() {
    return (
        <div className={cx('flex justify-center text-xl', 'wrapper')}>
            <div className={cx('w-full border-l-2 border-l-black bg-amber-100 px-4 py-3 text-amber-600')}>
                requires login
            </div>
        </div>
    );
}

export default RequiredLogin;
